import React from "react";
import GoogleMap from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

import "../../styles/Map.css";

/*

I TRIED ADDING A GOOGLEMAP BUT CAN'T GET IT TO WORK

*/
const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map" style={{ height: "100vh", width: "100%" }}>
      <GoogleMap
        bootstrapURLKeys={{ key: "AIzaSyCDVPQBXDdpK4UuIzR5ywkf3lMEnSMxPt4" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMap>
    </div>
  </div>
);

export default Map;
