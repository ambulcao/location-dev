import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../../App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import data1 from '../../data/data1.json';
import data2 from '../../data/data2.json';

Modal.setAppElement("#root");

const users = [
  { id: 'user1', data: data1 },
  { id: 'user2', data: data2 },
];

export default function LocationMap() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ lat: 0, lng: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState([]);

  const Logout = () => {
    window.localStorage.removeItem("isLogedIn");
    navigate("/");
  };

  const openModal = useCallback((position) => {
    setModalContent(position);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 41.332434, lng: -8.5273209 }), []);
  const options = useMemo(
    () => ({
      mapId: "13a84d305d69091b",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const loadUserData = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      console.log('Dados carregados:', user.data);
      const dataArray = user.data?.dados1 || user.data?.dados2 || [];
      setUserData(Array.isArray(dataArray) ? dataArray : []);
    }
  };

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

  useEffect(() => {
    if (selectedUser) {
      loadUserData(selectedUser);
    }
  }, [selectedUser]);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const handleSearch = async (searchValue) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: searchValue }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });

      if (results.length > 0) {
        const firstResult = results[0];

        if (
          firstResult.geometry &&
          firstResult.geometry.location &&
          typeof firstResult.geometry.location.lat === "function" &&
          typeof firstResult.geometry.location.lng === "function"
        ) {
          const { lat, lng } = firstResult.geometry.location;

          if (!isNaN(lat()) && !isNaN(lng())) {
            if (mapRef.current && mapRef.current.markers) {
              mapRef.current.markers.forEach((marker) => {
                marker.setMap(null);
              });
            }

            const marker = new window.google.maps.Marker({
              position: { lat: lat(), lng: lng() },
              map: mapRef.current,
              title: searchValue,
            });

            if (!mapRef.current.markers) {
              mapRef.current.markers = [];
            }
            mapRef.current.markers.push(marker);

            mapRef.current?.panTo({ lat: lat(), lng: lng() });

            console.log("Resultado da pesquisa:", firstResult);
          } else {
            console.warn("Coordenadas inválidas encontradas:", firstResult);
          }
        } else {
          console.warn("Resultado de pesquisa inválido:", firstResult);
        }
      } else {
        console.warn(
          "Nenhum resultado encontrado para a pesquisa:",
          searchValue
        );
      }
    } catch (error) {
      if (error === "ZERO_RESULTS") {
        console.warn(
          "Nenhum resultado encontrado para a pesquisa:",
          searchValue
        );
      } else {
        console.error("Erro durante a pesquisa:", error);
      }
    }
  };

  const handleDropdownChange = (selectedOption) => {
    console.log("Opção selecionada:", selectedOption);
    setSelectedUser(selectedOption);
  };

  return (
    <div className="map-container">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        options={options}
        onLoad={onLoad}
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            onClick={() => {
              openModal(currentLocation);
            }}
          />
        )}

        {userData.map((user) => (
          <Marker
            key={user.id_cliente}
            position={{ lat: Number(user.latitude), lng: Number(user.longitude) }}
            onClick={() => {
              openModal({
                lat: Number(user.latitude),
                lng: Number(user.longitude),
              });
            }}
            title={`${user.nome} (${user.id_cliente})`}
          />
        ))}
      </GoogleMap>

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
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

      <div className="footer bg-light p-3 d-md-flex flex-column flex-md-row justify-content-md-between">
        <div className="d-flex align-items-center mb-3 mb-md-0 text-md-start">
          <label htmlFor="searchInput" className="me-2">
            Search
          </label>
          <input
            type="text"
            id="searchInput"
            style={{ width: '400px' }}
            className="form-control"
            placeholder="Type your search here"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center mb-3 mb-md-0 mx-auto">
          <label htmlFor="dropdown" className="me-2">
            User
          </label>
          <select
            id="dropdown"
            style={{ width: '400px' }}
            className="form-select"
            onChange={(e) => handleDropdownChange(e.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.id}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 mb-md-0 text-center mx-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
