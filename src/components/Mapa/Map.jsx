import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement("#root");

export default function LocationMap() {
  const navigate = useNavigate()
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ lat: 0, lng: 0 });

  const Logout = () => {
    window.localStorage.removeItem("isLogedIn")
    navigate('/')
  }

  const openModal = useCallback((position) => {
    setModalContent(position);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

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

          if (!isNaN(latitude) && !isNaN(longitude)) {
            setCurrentLocation({ lat: latitude, lng: longitude });
          } else {
            console.error("Invalid coordinates:", position.coords);
          }
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
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        options={options}
        onLoad={onLoad}
      >
        {/* Marker for current location */}
        {currentLocation && (
          <Marker
            position={currentLocation}
            onClick={() => {
              openModal(currentLocation);
            }}
          />
        )}
      </GoogleMap>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Coordinates Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <h2>Coordinates</h2>
        <div>
          <p>Latitude: {modalContent.lat}</p>
          <p>Longitude: {modalContent.lng}</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
      </Modal>

      {/* Footer */}
      <div className="footer bg-light p-3 text-center">
        <div>
          <button type="button" className="btn btn-primary" onClick={() => Logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
}