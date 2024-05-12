import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 45.7577, // Example latitude
  lng: 4.8351, // Example longitude
};

const InteractiveMap = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10} // Adjust the initial zoom level as needed
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default InteractiveMap;