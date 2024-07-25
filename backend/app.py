from flask import Flask,jsonify,request
from flask_cors import CORS
import geopy.distance
import pickle
import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry
from datetime import datetime
import warnings
warnings.filterwarnings("ignore")

# filename='C:/Users/jogee/Desktop/P. Jogeeswara V. N. S/Machine Learning/OlaBikeRideForecastDemand/model/ml_cbp_voting_model_98.sav'
filename='C:/Users/jogee/Desktop/P. Jogeeswara V. N. S/Machine Learning/OlaBikeRideForecastDemand/frontend/model/ml_cbp_voting_model_98.sav'
loaded_model = pickle.load(open(filename, 'rb'))

app=Flask(__name__)

CORS(app)




@app.route('/predict',methods=['POST'])    
def predict_price():
    now = datetime.now()
    date=now.strftime("%Y-%m-%d")
    p=int(str(now.strftime("%H:%M:%S")).split(":")[0])
    print(p)
    pickuplocationselection=request.json['pickuplocationselection']
    dropofflocationselection=request.json['dropofflocationselection']
    pickuplat=pickuplocationselection['lat']
    pickuplon=pickuplocationselection['lon']
    dropofflat=dropofflocationselection['lat']
    dropofflon=dropofflocationselection['lon']

    # Setup the Open-Meteo API client with cache and retry on error
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)

    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": pickuplat,
        "longitude": pickuplon,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "wind_speed_10m"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "wind_speed_10m"],
        "timeformat": "unixtime",
        "forecast_days": 1
    }
    responses = openmeteo.weather_api(url, params=params)

    # Process first location. Add a for-loop for multiple locations or weather models
    response = responses[0]

    # Current values. The order of variables needs to be the same as requested.
    current = response.Current()
    current_temperature_2m = current.Variables(0).Value()
    current_apparent_temperature = current.Variables(2).Value()
    current_relative_humidity_2m = current.Variables(1).Value()
    current_wind_speed_10m = current.Variables(3).Value()

    # Process hourly data. The order of variables needs to be the same as requested.
    hourly = response.Hourly()
    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
    hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
    hourly_apparent_temperature = hourly.Variables(2).ValuesAsNumpy()
    hourly_wind_speed_10m = hourly.Variables(3).ValuesAsNumpy()

    hourly_data = {"date": pd.date_range(
        start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
        end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
        freq = pd.Timedelta(seconds = hourly.Interval()),
        inclusive = "left"
    )}

    # print(hourly_temperature_2m)

    inr=83.37

    coords_1 = (pickuplat, pickuplon)
    coords_2 = (dropofflat, dropofflon)

    distance=geopy.distance.geodesic(coords_1, coords_2).km

    max_distance=46.740000
    
    if distance<=max_distance:

        prices=[]

        hours=[]

        for i in range(len(hourly_temperature_2m)):
            price=round(loaded_model.predict([[distance,
                            hourly_temperature_2m[i],
                            hourly_apparent_temperature[i],
                            hourly_relative_humidity_2m[i],
                            hourly_wind_speed_10m[i]
                            ]])[0]*inr,2)
            prices.append(price)
        
        print(prices)

        print(distance,
                                    current_temperature_2m,
                                    current_apparent_temperature,
                                    current_relative_humidity_2m,
                                    current_wind_speed_10m)

        price=round(loaded_model.predict([[distance,
                                    current_temperature_2m,
                                    current_apparent_temperature,
                                    current_relative_humidity_2m,
                                    current_wind_speed_10m
                                    ]])[0]*inr,2)
        print(price)


        weather={}

        weather['current_temperature_2m']=current_temperature_2m
        weather['current_apparent_temperature']=current_apparent_temperature
        weather['current_relative_humidity_2m']=current_relative_humidity_2m
        weather['current_wind_speed_10m']=current_wind_speed_10m

        print(weather)

        hourly_temperature_2m=hourly_temperature_2m[p:].tolist()
        hourly_temperature_2m.insert(0,current_temperature_2m)
        print(hourly_temperature_2m)


        hourly_apparent_temperature=hourly_apparent_temperature[p:].tolist()
        hourly_apparent_temperature.insert(0,current_apparent_temperature)
        print(hourly_apparent_temperature)



        hourly_relative_humidity_2m=hourly_relative_humidity_2m[p:].tolist()
        hourly_relative_humidity_2m.insert(0,current_relative_humidity_2m)
        print(hourly_relative_humidity_2m)


        hourly_wind_speed_10m=hourly_wind_speed_10m[p:].tolist()
        hourly_wind_speed_10m.insert(0,current_wind_speed_10m)
        print(hourly_wind_speed_10m)

        data={}
        for i in range(p,len(prices)+1):
            hours.append(i)
        data['price']=price
        data['prices']=prices[p-1:]
        data['distance']=distance
        data['hour']=p
        data['hours']=hours
        data['weather']=weather
        data['hourly_temperature_2m']=hourly_temperature_2m
        data['hourly_apparent_temperature']=hourly_apparent_temperature
        data['hourly_relative_humidity_2m']=hourly_relative_humidity_2m
        data['hourly_wind_speed_10m']=hourly_wind_speed_10m
        return jsonify(data)
    else:
        print("Exceeds Max Distance")
        data={}
        data['price']=0
        data['distance']=0
        data['prices']=[]
        data['hour']=p
        data['hours']=[]
        data['weather']={}
        return jsonify(data)


if __name__=='__main__':
    app.run(debug = True)