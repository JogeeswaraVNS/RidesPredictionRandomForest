import React, { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ModalComponent from "../components/ModalComponent";

function Search(props) {
  const [fare, setfare] = useState(null);

  const [prices, setprices] = useState(null);

  const [hour, sethour] = useState(null);

  const [hours, sethours] = useState(null);

  const [distance, setdistance] = useState(null);

  const [weather, setweather] = useState(null);

  const [hourly_temperature_2m, sethourly_temperature_2m] = useState(null);

  const [hourly_apparent_temperature, sethourly_apparent_temperature] =
    useState(null);

  const [hourly_relative_humidity_2m, sethourly_relative_humidity_2m] =
    useState(null);

  const [hourly_wind_speed_10m, sethourly_wind_speed_10m] = useState(null);

  const [modalprices, setmodalprices] = useState(false);

  const [vehicle, setvehicle] = useState("");

  const [vehicleimage, setvehicleimage] = useState("");

  const [vehicleprice, setvehicleprice] = useState(1.0);

  const car = 1.25;

  const auto = 0.75;

  const bike = 0.4;

  const { seefare, setseefare } = props;

  const [seefareloading, setseefareloading] = useState(true);

  const [seefareclick, setseefareclick] = useState(false);

  const [pickuploading, setpickuploading] = useState(true);

  const [pickupsearch, setpickupsearch] = useState(false);

  const [dropoffloading, setdropoffloading] = useState(true);

  const [dropoffsearch, setdropoffsearch] = useState(false);

  const [selectpickup, setselectpickup] = useState(false);

  const [selectdropoff, setselectdropoff] = useState(false);

  const [pickuplocationslength, setpickuplocationslength] = useState(-1);

  const [dropofflocationslength, setdropofflocationslength] = useState(-1);

  const [pickuplocations, setpickuplocations] = useState([]);

  const [pickuplocation, setpickuplocation] = useState("");

  const [dropofflocations, setdropofflocations] = useState([]);

  const [dropofflocation, setdropofflocation] = useState("");

  const { pickuplocationselection, setpickuplocationselection } = props;

  const { dropofflocationselection, setdropofflocationselection } = props;

  const { pickupmark, setpickupmark } = props;

  const { dropoffmark, setdropoffmark } = props;

  const [pickuplocationselectioncolor, setpickuplocationselectioncolor] =
    useState("");

  const [dropofflocationselectioncolor, setdropofflocationselectioncolor] =
    useState("");

  const api =
    "https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=";

  const [pickupstatus, setpickupstatus] = useState(0);

  const [dropoffstatus, setdropoffstatus] = useState(0);

  const getDatapickuplocations = async () => {
    const response = await axios.get(`${api}${pickuplocation}`);
    setpickupstatus(response.status);
    setpickuplocations(response.data);
    setpickuplocationslength(response.data.length);
    setpickuploading(false);
  };

  const getDatadropofflocations = async () => {
    const response = await axios.get(`${api}${dropofflocation}`);
    setdropoffstatus(response.status);
    setdropofflocations(response.data);
    setdropofflocationslength(response.data.length);
    setdropoffloading(false);
  };

  let backendapi = "http://localhost:5000";

  const getprediction = async () => {
    const response = await axios.post(`${backendapi}/predict`, {
      pickuplocationselection,
      dropofflocationselection,
    });
    setweather(response.data.weather);
    setprices(response.data.prices);
    sethourly_temperature_2m(response.data.hourly_temperature_2m);
    sethourly_apparent_temperature(response.data.hourly_apparent_temperature);
    sethourly_relative_humidity_2m(response.data.hourly_relative_humidity_2m);
    sethourly_wind_speed_10m(response.data.hourly_wind_speed_10m);
    // console.log(response.data.hours)
    // console.log(response.data.prices)
    sethour(response.data.hour);
    sethours(response.data.hours);
    setfare(response.data.price);
    setdistance(response.data.distance);
    setseefareloading(false);
  };

  return (
    <div className="p-3">
      <div>
        <div className="input-group">
          <div class="form-floating">
            <input
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getDatapickuplocations();
                  setpickupsearch(true);
                  setpickuploading(true);
                }
              }}
              onChange={(event) => {
                setpickuplocation(event.target.value);
              }}
              value={pickuplocation}
              type="text"
              class="form-control"
              id="pickup"
              placeholder="Enter Pickup Location"
            ></input>
            <label for="pickup">
              <PlaceIcon className="text-primary" />
              Enter Pickup Location
            </label>
          </div>
          {selectpickup === false ? (
            <div
              className="input-group-text"
              onClick={() => {
                getDatapickuplocations();
                setpickupsearch(true);
                setpickuploading(true);
              }}
            >
              <SearchIcon />
            </div>
          ) : (
            <div
              className="input-group-text"
              onClick={() => {
                setpickuplocation("");
                setpickuplocations([]);
                setselectpickup(false);
                setfare(null);
              }}
            >
              <CloseIcon />
            </div>
          )}
        </div>

        {pickuploading && pickupsearch && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="pt-3 ps-1"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="ms-2">
              <h6>Loading Pick Up Locations For You</h6>
            </div>
          </div>
        )}
        {pickuplocationslength === 0 && pickupstatus === 200 ? (
          <div>
            <h6 className="pt-3 ps-1">No Results found</h6>
          </div>
        ) : (
          <div>
            {pickuplocations.map((item) => {
              return (
                <div>
                  <hr></hr>

                  <div className={pickuplocationselectioncolor}>
                    <div
                      onMouseEnter={() =>
                        setpickuplocationselectioncolor("btn-primary")
                      }
                      onClick={() => {
                        // console.log(item)
                        setfare(null);
                        setdistance(-1);
                        setselectpickup(true);
                        setpickuplocations([]);
                        setpickuplocation(item.display_name);
                        setpickupmark(true);
                        setdropoffmark(false);
                        setpickuplocationselection(item);
                      }}
                      className="d-flex btn"
                    >
                      <div>
                        <PlaceIcon
                          style={{ width: "50", height: "50" }}
                          className="text-primary"
                        />
                      </div>
                      <div style={{ textAlign: "justify" }}>
                        <h6>{item.display_name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="input-group mt-3">
          <div class="form-floating">
            <input
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setdropoffsearch(true);
                  setdropoffloading(true);
                  getDatadropofflocations();
                }
              }}
              onChange={(event) => {
                setdropofflocation(event.target.value);
              }}
              value={dropofflocation}
              type="text"
              class="form-control"
              id="dropoff"
              placeholder="Enter Drop Location"
            ></input>
            <label for="dropoff">
              <PlaceIcon className="text-danger" />
              Enter Drop Location
            </label>
          </div>
          {selectdropoff === false ? (
            <div
              className="input-group-text"
              onClick={() => {
                setdropoffsearch(true);
                setdropoffloading(true);
                getDatadropofflocations();
              }}
            >
              <SearchIcon />
            </div>
          ) : (
            <div
              className="input-group-text"
              onClick={() => {
                setdropofflocation("");
                setdropofflocations([]);
                setselectdropoff(false);
                setfare(null);
              }}
            >
              <CloseIcon />
            </div>
          )}
        </div>

        {dropoffloading && dropoffsearch && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="pt-3 ps-1"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="ms-2">
              <h6>Loading Drop Locations For You</h6>
            </div>
          </div>
        )}
        {dropofflocationslength === 0 && dropoffstatus === 200 ? (
          <div>
            <h6 className="pt-3 ps-1">No Results found</h6>
          </div>
        ) : (
          <div>
            {dropofflocations.map((item) => {
              return (
                <div>
                  <hr></hr>

                  <div className={dropofflocationselectioncolor}>
                    <div
                      onMouseEnter={() =>
                        setdropofflocationselectioncolor("btn-danger")
                      }
                      onClick={() => {
                        // console.log(item)
                        setfare(null);
                        setdistance(-1);
                        setselectdropoff(true);
                        setdropofflocations([]);
                        setdropofflocation(item.display_name);
                        setpickupmark(false);
                        setdropoffmark(true);
                        setdropofflocationselection(item);
                      }}
                      className="d-flex btn"
                    >
                      <div>
                        <PlaceIcon
                          style={{ width: "50", height: "50" }}
                          className="text-danger"
                        />
                      </div>
                      <div style={{ textAlign: "justify" }}>
                        <h6>{item.display_name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* {console.log("selectpickup "+selectpickup)}
{console.log("selectdropoff "+selectdropoff)} */}

        <button
          style={{ width: "100%" }}
          disabled={!(selectpickup && selectdropoff)}
          onClick={() => {
            setseefare(true);
            getprediction();
            setseefareclick(true);
            setseefareloading(true);
          }}
          className="btn btn-dark mt-3"
        >
          <h4 className="p-1">See Fare</h4>
        </button>

        {seefareloading && seefareclick && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
            className="pt-3 ps-1"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="d-inline ms-2">
              <h6>Getting fares for you</h6>
            </div>
          </div>
        )}

        {fare !== null && fare !== 0 && distance !== 0 && (
          <div className="mt-3">
            <div class="card">
              <div className="d-flex">
                <img
                  src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png"
                  width="100"
                  height="100"
                  alt="..."
                ></img>
                <div class="card-body">
                  <h3>Moto</h3>

                  <h6 className="pb-1">Affordable, motorcycle rides</h6>
                </div>

                <div>
                  <div
                    onClick={() => {
                      setvehicle("Moto");
                      setmodalprices(true);
                      setvehicleprice(bike);
                      setvehicleimage(
                        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png"
                      );
                    }}
                    className="btn btn-outline-dark me-4 mt-4"
                  >
                    <div
                      style={{ width: "7rem", justifyContent: "center" }}
                      className="d-flex"
                    >
                      <div>
                        <CurrencyRupeeIcon
                          className=""
                          style={{ width: "30", height: "30" }}
                        />
                      </div>

                      <div>
                        <h4>{(fare * bike).toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-3">
              <div className="d-flex">
                <img
                  src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png"
                  width="100"
                  height="100"
                  alt="..."
                ></img>
                <div class="card-body">
                  <h3>Auto</h3>

                  <h6 className="pb-1">No bargaining, doorstep pick-up</h6>
                </div>

                <div>
                  <div
                    onClick={() => {
                      setvehicle("Auto");
                      setmodalprices(true);
                      setvehicleprice(auto);
                      setvehicleimage(
                        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png"
                      );
                    }}
                    className="btn btn-outline-dark me-4 mt-4"
                  >
                    <div
                      style={{ width: "7rem", justifyContent: "center" }}
                      className="d-flex"
                    >
                      <div>
                        <CurrencyRupeeIcon
                          className="pt-1"
                          style={{ width: "30", height: "30" }}
                        />
                      </div>

                      <div>
                        <h4>{(fare * auto).toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-3">
              <div className="d-flex">
                <img
                  src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberGo_v1.png"
                  width="100"
                  height="100"
                  alt="..."
                ></img>
                <div class="card-body">
                  <h3>Cab</h3>

                  <h6 className="pb-1">Affordable, compact rides</h6>
                </div>

                <div>
                  <div
                    onClick={() => {
                      setvehicle("Car");
                      setmodalprices(true);
                      setvehicleprice(1.0);
                      setvehicleimage(
                        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberGo_v1.png"
                      );
                    }}
                    className="btn btn-outline-dark me-4 mt-4"
                  >
                    <div
                      style={{ width: "7rem", justifyContent: "center" }}
                      className="d-flex"
                    >
                      <div>
                        <CurrencyRupeeIcon
                          className="pt-1"
                          style={{ width: "30", height: "30" }}
                        />
                      </div>

                      <div>
                        <h4>{fare.toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-3">
              <div className="d-flex">
                <img
                  src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png"
                  width="100"
                  height="100"
                  alt="..."
                ></img>
                <div class="card-body">
                  <h3>Premier</h3>

                  <h6 className="pb-1">
                    Comfortable sedans, top-quality drivers
                  </h6>
                </div>

                <div>
                  <div
                    onClick={() => {
                      setvehicle("Premier");
                      setmodalprices(true);
                      setvehicleprice(car);
                      setvehicleimage(
                        "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png"
                      );
                    }}
                    className="btn btn-outline-dark me-4 mt-4"
                  >
                    <div
                      style={{ width: "7rem", justifyContent: "center" }}
                      className="d-flex"
                    >
                      <div>
                        <CurrencyRupeeIcon
                          className="pt-1"
                          style={{ width: "30", height: "30" }}
                        />
                      </div>

                      <div>
                        <h4>{(fare * car).toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {fare !== null && fare === 0 && distance === 0 && (
          <div>
            <h4>Exceeds Maximum Distance</h4>
          </div>
        )}

        {modalprices && (
          <div>
            <ModalComponent
              hourly_apparent_temperature={hourly_apparent_temperature}
              hourly_relative_humidity_2m={hourly_relative_humidity_2m}
              hourly_temperature_2m={hourly_temperature_2m}
              hourly_wind_speed_10m={hourly_wind_speed_10m}
              distance={distance}
              weather={weather}
              hours={hours}
              vehicleimage={vehicleimage}
              vehicleprice={vehicleprice}
              vehicle={vehicle}
              prices={prices}
              hour={hour}
              setmodalprices={setmodalprices}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
