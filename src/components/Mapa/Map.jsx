import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";

export default function LocationMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 41.332434, lng: -8.5273209 }), []);
  const options = useMemo(() => ({
    mapId: "13a84d305d69091b",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCdQZtDgTu7ybq7GzoOgKhNw1PT7JKexLg",
      version: "weekly",
    });

    loader.load().then(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        });
      } else {
        alert("Geolocation is not supported by your browser");
      }
    });
  }, []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className="map-container">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        options={options}
        onLoad={onLoad}
      >
        {currentLocation && (
          <>
            <Marker
              position={currentLocation}
              onClick={() => {
                // Lógica ao clicar no marcador da localização corrente, se necessário
              }}
            />

            <Circle
              center={currentLocation}
              radius={1500}
              options={{
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                fillOpacity: 0.05,
                strokeColor: "#8BC34A",
                fillColor: "#8BC34A",
                zIndex: 3,
              }}
            />

            <Circle
              center={currentLocation}
              radius={2000}
              options={{
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                fillOpacity: 0.05,
                strokeColor: "#FBC02D",
                fillColor: "#FBC02D",
                zIndex: 2,
              }}
            />

            <Circle
              center={currentLocation}
              radius={2500}
              options={{
                strokeOpacity: 0.5,
                strokeWeight: 2,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                fillOpacity: 0.05,
                strokeColor: "#FF5252",
                fillColor: "#FF5252",
                zIndex: 1,
              }}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
}
