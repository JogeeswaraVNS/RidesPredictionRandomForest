import React, { useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import L from "leaflet";

function Maps(props) {
  let [position, setposition] = useState([17.4834, 78.3871]);

  function ResetCenterView(props) {
    const { pickuplat, pickuplon, pickupmark } = props;

    const { dropofflat, dropofflon, dropoffmark } = props;

    // console.log(props)

    const map = useMap();

    if (
      pickuplat !== undefined &&
      pickuplon != undefined &&
      pickupmark === true
    ) {
      map.setView(
        L.latLng(pickuplat, pickuplon),
        map.getZoom(),
        // map.setZoom(16),
        {
          animate: true,
        }
      );
    }

    if (
      dropofflat !== undefined &&
      dropofflon != undefined &&
      dropoffmark === true
    ) {
      map.setView(
        L.latLng(dropofflat, dropofflon),
        map.getZoom(),
        // map.setZoom(16),
        {
          animate: true,
        }
      );
    }

    return null;
  }

  const { pickuplat, pickuplon, pickupname } = props;

  const { dropofflat, dropofflon, dropoffname } = props;

  //   console.log("pickuplat"+pickuplat
  // +"pickuplon"+pickuplon
  // +"pickupname"+pickupname
  // )

  // console.log("dropofflat"+dropofflat
  // +"dropofflon"+dropofflon
  // +"dropoffname"+dropoffname
  // )

  const { pickupmark, setpickupmark } = props;

  const { dropoffmark, setdropoffmark } = props;

  //    console.log("pickupmark"+pickupmark)

  //  console.log("dropoffmark"+dropoffmark)

  const pickupcustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/14035/14035451.png",
    iconSize: [50, 50],
  });

  const dropoffcustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/14090/14090313.png",
    iconSize: [50, 50],
  });

  const Bounds = [
    [pickuplat, pickuplon],
    [dropofflat, dropofflon],
  ];

  function ResetBounds() {
    const map = useMap();
    map.fitBounds(Bounds);
    // map.setZoom(13)
  }

  return (
    <div>
      <div>
        <MapContainer
          style={{ height: "90vh", width: "100%" }}
          center={position}
          zoom={14}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=llz6weLPxPuTPPQZ56nJ"
          />
          {pickuplat && (
            <Marker icon={pickupcustomIcon} position={[pickuplat, pickuplon]}>
              <Tooltip permanent>
                <div
                  position="right"
                  style={{ width: "250px", whiteSpace: "normal" }}
                >
                  {pickupname}
                </div>
              </Tooltip>
            </Marker>
          )}

          {dropofflat && (
            <Marker
              icon={dropoffcustomIcon}
              position={[dropofflat, dropofflon]}
            >
              <Tooltip permanent>
                <div
                  position="right"
                  style={{ width: "250px", whiteSpace: "normal" }}
                >
                  {dropoffname}
                </div>
              </Tooltip>
            </Marker>
          )}

          <ResetCenterView
            pickuplat={pickuplat}
            pickuplon={pickuplon}
            dropofflat={dropofflat}
            dropofflon={dropofflon}
            pickupmark={pickupmark}
            dropoffmark={dropoffmark}
          />

          {props.seefare && (
            <Polyline
              positions={[
                [pickuplat, pickuplon],
                [dropofflat, dropofflon],
              ]}
              pathOptions={{ color: "blue" }}
            />
          )}

          {props.seefare && <ResetBounds />}
        </MapContainer>
      </div>
    </div>
  );
}

export default Maps;
