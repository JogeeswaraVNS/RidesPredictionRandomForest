import React, { useState } from "react";
import { Modal, ModalTitle, ModalBody, ModalFooter } from "react-bootstrap";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function ModalComponent(props) {
  const [showmodal, setshowmodal] = useState(true);

  const [selectedtime, setselectedtime] = useState(0);

  const { vehicle, vehicleprice, vehicleimage } = props;

  const car = 1.25;

  const auto = 0.75;

  const bike = 0.4;

  return (
    <div>
      <div>
        <Modal show={showmodal} backdrop="static" centered className="modal-xl">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ marginRight: "auto" }}>
              <ModalTitle className="ps-3 pt-3">{props.vehicle}</ModalTitle>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn-close pt-5 pe-5"
                type="button"
                onClick={() => {
                  props.setmodalprices(false);
                  setshowmodal(false);
                }}
              ></button>
            </div>
          </div>

          <ModalBody style={{ marginTop: "-1rem" }}>
            <div>
              <div style={{ overflowX: "auto" }} className="p-3">
                <div
                  style={{ display: "flex", gap: "2rem", flexWrap: "nowrap" }}
                >
                  {props.prices.map((data, idx) => (
                    <div
                      className={`btn ${
                        idx === selectedtime ? "btn-dark" : " btn-outline-dark"
                      }`}
                      onClick={() => {
                        setselectedtime(idx);
                      }}
                      key={idx}
                    >
                      <div>
                        <img src={vehicleimage} width="200" height="200"></img>
                        <div style={{ display: "block", margin: "auto" }}>
                          {props.hours[idx] < 12 && (
                            <h6>{props.hours[idx]}:00 AM</h6>
                          )}
                          {props.hours[idx] === 12 && (
                            <h6>{props.hours[idx]}:00 PM</h6>
                          )}
                          {props.hours[idx] > 12 && props.hours[idx] < 24 && (
                            <h6>{props.hours[idx] - 12}:00 PM</h6>
                          )}
                          {props.hours[idx] === 24 && (
                            <h6>{props.hours[idx] - 12}:00 AM</h6>
                          )}
                          <div
                            className={`btn ${
                              idx === selectedtime ? "btn-dark" : " btn-dark"
                            }`}
                          >
                            <h4>
                              <CurrencyRupeeIcon
                                className="mb-1"
                                style={{ width: "20", height: "20" }}
                              />
                              {(data * vehicleprice).toFixed(2)}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>

          <div className="mx-5 my-2">
            <div>
              <h5>
                {props.hours[selectedtime] < 12 && (
                  <h5>Selected hour {props.hours[selectedtime]}:00 AM</h5>
                )}
                {props.hours[selectedtime] === 12 && (
                  <h5>Selected hour {props.hours[selectedtime]}:00 PM</h5>
                )}
                {props.hours[selectedtime] > 12 &&
                  props.hours[selectedtime] < 24 && (
                    <h5>
                      Selected hour {props.hours[selectedtime] - 12}:00 PM
                    </h5>
                  )}
                {props.hours[selectedtime] === 24 && (
                  <h5>Selected hour {props.hours[selectedtime] - 12}:00 AM</h5>
                )}
              </h5>
            </div>

            <div>
              <div style={{ textAlign: "center" }} className="row my-4">
                <div className="col">
                  <svg
                    className="px-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512.005 512.005"
                    id="distance"
                  >
                    <path d="M117.824 81.963c-30.151 0-54.681 24.53-54.681 54.681s24.53 54.681 54.681 54.681 54.681-24.524 54.681-54.681c0-30.151-24.53-54.681-54.681-54.681zm0 74.084c-10.883 0-19.403-8.526-19.403-19.403 0-10.878 8.52-19.403 19.403-19.403s19.403 8.52 19.403 19.403-8.52 19.403-19.403 19.403z"></path>
                    <path d="M235.377 136.003c-4.392-62.942-56.028-112.25-117.553-112.25S4.663 73.061.276 135.985c-1.982 27.688 6.738 56.275 24.636 80.617L103.7 321.849a17.644 17.644 0 0 0 28.246 0l78.876-105.37c17.817-24.23 26.53-52.818 24.555-80.476zm-52.888 59.456-64.665 86.385-64.577-86.267c-12.847-17.474-19.162-37.748-17.78-57.116 2.722-39.047 34.273-79.429 82.357-79.429s79.635 40.388 82.363 79.464c1.382 19.333-4.939 39.606-17.698 56.963zm211.682 45.844c-30.151 0-54.681 24.53-54.681 54.681s24.53 54.681 54.681 54.681c29.293 0 53.823-24.307 54.681-54.681 0-30.151-24.53-54.681-54.681-54.681zm0 74.084c-10.883 0-19.403-8.52-19.403-19.403s8.52-19.403 19.403-19.403 19.403 8.526 19.409 18.903c-.312 10.972-9.02 19.903-19.409 19.903z"></path>
                    <path d="M511.73 295.349c-4.392-62.942-56.022-112.25-117.553-112.25s-113.161 49.307-117.547 112.22c-1.981 27.693 6.738 56.281 24.636 80.617l78.788 105.247a17.624 17.624 0 0 0 14.117 7.067 17.624 17.624 0 0 0 14.117-7.067l78.888-105.365c17.81-24.217 26.529-52.805 24.554-80.469zm-52.894 59.45-64.671 86.385-64.577-86.267c-12.847-17.469-19.156-37.742-17.774-57.11 2.722-39.041 34.267-79.429 82.357-79.429 48.09 0 79.635 40.382 82.357 79.458 1.376 19.345-4.933 39.618-17.692 56.963z"></path>
                    <path d="m108.408 325.932 17.642-30.55 276.945 159.932-17.643 30.55z"></path>
                  </svg>

                  <div className="mt-2">
                    <h5>Distance</h5>
                    <h5>{props.distance.toFixed(2)} km</h5>
                  </div>
                </div>

                <div className="col">
                  <svg
                    className="px-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="light"
                  >
                    <g>
                      <rect width="1" height="1.5" x="6"></rect>
                      <rect width="1.5" height="1" y="6"></rect>
                      <rect
                        width="1.5"
                        height="1"
                        x="9.816"
                        y="1.934"
                        transform="rotate(-45 10.566 2.434)"
                      ></rect>
                      <rect
                        width="1.5"
                        height="1"
                        x="1.684"
                        y="10.066"
                        transform="rotate(-45 2.434 10.566)"
                      ></rect>
                      <rect
                        width="1"
                        height="1.5"
                        x="1.934"
                        y="1.684"
                        transform="rotate(-45 2.434 2.434)"
                      ></rect>
                      <path d="M6.28461 9.97821A3.4922 3.4922 0 119.45569 4.64447c.243-.31274.46454-.58887.64837-.81195a4.48729 4.48729 0 10-4.06384 7.121A5.73057 5.73057 0 016.28461 9.97821zM11.5 16A4.52178 4.52178 0 017 11.4668c0-2.34278 3.69629-6.79 4.11768-7.28907a.51657.51657 0 01.76464 0C12.30371 4.67676 16 9.124 16 11.4668A4.52178 4.52178 0 0111.5 16zm0-10.71191C10.25635 6.83838 8 9.96289 8 11.4668a3.50016 3.50016 0 107 0C15 9.96289 12.74365 6.83838 11.5 5.28809z"></path>
                    </g>
                  </svg>

                  <div className="mt-2">
                    <h5>Relative Humidity</h5>
                    <h5>
                      {props.hourly_relative_humidity_2m[selectedtime].toFixed(
                        2
                      )}{" "}
                      %
                    </h5>
                  </div>
                </div>

                <div className="col">
                  <svg
                    className="px-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="wind"
                  >
                    <path d="M5,18a1,1,0,1,0,1,1A1,1,0,0,0,5,18Zm14-4H12a1,1,0,0,0,0,2h7a1,1,0,0,1,0,2,1,1,0,0,0,0,2,3,3,0,0,0,0-6Zm-5-3a1,1,0,0,0,1,1h4a3,3,0,0,0,3-3,1,1,0,0,0-2,0,1,1,0,0,1-1,1H15A1,1,0,0,0,14,11Zm-4,4a1,1,0,0,0-1-1H6a2,2,0,0,1,0-4A1,1,0,0,0,7,9a5,5,0,0,1,9.73-1.61,1,1,0,1,0,1.9-.64A7,7,0,0,0,5.06,8.11,4,4,0,0,0,6,16H9A1,1,0,0,0,10,15Zm0-4a1,1,0,1,0,1-1A1,1,0,0,0,10,11Zm4,7H9a1,1,0,0,0,0,2h5a1,1,0,0,1,1,1,1,1,0,0,0,2,0A3,3,0,0,0,14,18Z"></path>
                  </svg>

                  <div className="mt-2">
                    <h5>Wind Speed</h5>
                    <h5>
                      {props.hourly_wind_speed_10m[selectedtime].toFixed(2)}{" "}
                      kmph
                    </h5>
                  </div>
                </div>

                <div className="col">
                  <svg
                    className="px-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="storm-weather"
                  >
                    <path d="M11.58,16.5H10.32l.86-1.5a1,1,0,1,0-1.73-1L7.72,17a1,1,0,0,0,.86,1.5H9.85L9,20a1,1,0,0,0,1.74,1l1.73-3a1,1,0,0,0,0-1A1,1,0,0,0,11.58,16.5ZM21,7.5h-.8a4.25,4.25,0,0,0-.52-1.27l.56-.56a1,1,0,0,0-1.41-1.41l-.56.56A4.25,4.25,0,0,0,17,4.3V3.5a1,1,0,0,0-2,0v.8a4.25,4.25,0,0,0-1.27.52l-.56-.56a1,1,0,0,0-1.41,1.41l.56.57c-.09.15-.16.32-.24.48A5.85,5.85,0,0,0,10.5,6.5a6,6,0,0,0-5.94,5.13,3.49,3.49,0,0,0-.34,6.62,1,1,0,1,0,.72-1.86A1.5,1.5,0,0,1,5.5,13.5a1,1,0,0,0,1-1,4,4,0,0,1,7.78-1.29,1,1,0,0,0,.78.67,2.33,2.33,0,0,1,.25,4.53,1,1,0,0,0,.27,2,.84.84,0,0,0,.27,0,4.3,4.3,0,0,0,2.85-5.72l.13.13a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.56-.56A4.25,4.25,0,0,0,20.2,9.5H21a1,1,0,0,0,0-2Zm-3.34,2.65h0a2.28,2.28,0,0,1-.6.41A4.17,4.17,0,0,0,16,10a6.12,6.12,0,0,0-2.09-2.49,2.42,2.42,0,0,1,.46-.7h0a2.43,2.43,0,0,1,3.3,0h0a2.37,2.37,0,0,1,0,3.3Z"></path>
                  </svg>

                  <div className="mt-2">
                    <h5>Apparent Temperature</h5>
                    <h5>
                      {props.hourly_apparent_temperature[selectedtime].toFixed(
                        2
                      )}
                      °C
                    </h5>
                  </div>
                </div>

                <div className="col">
                  <svg
                    className="px-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="warm-weather"
                  >
                    <path d="M21,9h-.8a4.25,4.25,0,0,0-.52-1.27l.56-.56a1,1,0,0,0-1.41-1.41l-.56.56A4.25,4.25,0,0,0,17,5.8V5a1,1,0,0,0-2,0v.8a4.1,4.1,0,0,0-1.26.52l-.57-.56a1,1,0,0,0-1.41,1.41l.56.57c-.09.15-.16.32-.24.48A5.85,5.85,0,0,0,10.5,8a6,6,0,0,0-5.94,5.13A3.5,3.5,0,0,0,5.5,20h9.17A4.33,4.33,0,0,0,19,15.67a4.19,4.19,0,0,0-.3-1.55l.13.12a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.56-.56A4.25,4.25,0,0,0,20.2,11H21a1,1,0,0,0,0-2Zm-6.33,9H5.5a1.5,1.5,0,0,1,0-3,1,1,0,0,0,1-1,4,4,0,0,1,7.78-1.29,1,1,0,0,0,.78.67A2.33,2.33,0,0,1,14.67,18Zm3-6.35h0a2.17,2.17,0,0,1-.6.4A4.49,4.49,0,0,0,16,11.54a6.12,6.12,0,0,0-2.09-2.49,2.25,2.25,0,0,1,.46-.69h0a2.42,2.42,0,0,1,3.29,0h0a2.37,2.37,0,0,1,0,3.3Z"></path>
                  </svg>

                  <div className="mt-2">
                    <h5>Temperature</h5>
                    <h5>
                      {props.hourly_temperature_2m[selectedtime].toFixed(2)}°C
                    </h5>
                  </div>
                </div>
              </div>

              <h5 className="mb-4">
                At the pickup location, we check attributes such as Relative
                Humidity, Wind Speed, Apparent Temperature, and Temperature,
                which are used to calculate the fare.
              </h5>

              <ModalFooter>
                <h5 className="me-3">
                  The fare is
                  <CurrencyRupeeIcon
                    className="ms-1 mb-1"
                    style={{ width: "20", height: "20" }}
                  />
                  {(props.prices[selectedtime] * vehicleprice).toFixed(2)}
                </h5>

                <button className="btn btn-success">
                  {selectedtime === 0 ? (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pb-1"
                        style={{ fill: "white" }}
                        height="25"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                      <h5 className="d-inline ms-2">Book Now</h5>
                    </div>
                  ) : (
                    <h5 className="mt-1">
                      {props.hours[selectedtime] < 12 && (
                        <h5>Book at {props.hours[selectedtime]}:00 AM</h5>
                      )}
                      {props.hours[selectedtime] === 12 && (
                        <h5>Book at {props.hours[selectedtime]}:00 PM</h5>
                      )}
                      {props.hours[selectedtime] > 12 &&
                        props.hours[selectedtime] < 24 && (
                          <h5>
                            Book at {props.hours[selectedtime] - 12}:00 PM
                          </h5>
                        )}
                      {props.hours[selectedtime] === 24 && (
                        <h5>Book at {props.hours[selectedtime] - 12}:00 AM</h5>
                      )}
                    </h5>
                  )}
                </button>
              </ModalFooter>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ModalComponent;
