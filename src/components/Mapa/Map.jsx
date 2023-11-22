import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  //MarkerClusterer
} from "@react-google-maps/api";
import PlaceDetail from "../placeDetail";
import Distance from "../distance";
import { Loader } from "@googlemaps/js-api-loader";
import data from '../../data.json';

export default function LocationMap() {
  const [coordinates, setCoordinates] = useState([]);
  const navigate = useNavigate();
  const [directions, setDirections] = useState();
  const [currentLocation, setCurrentLocation] = useState(null);
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

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Fetch coordinates from the data.json file
        setCoordinates(data.dados.map((cliente) => ({
          latitude: parseFloat(cliente.latitude),
          longitude: parseFloat(cliente.longitude),
        })));
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  
  const fetchDirections = (house) => {
    if (!currentLocation) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: currentLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };
  //const image = "https://developers.google.com/maps/documentation/javascript/exemples/full/images/beachflag.png";
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handleLogout = () => {
    logout();
    navigate("/login");
    forceUpdate();
  };

  function logout() {
    $.ajax({
      url: "logout.php",
      type: "GET",
      success: function () {
        window.location.href = "/home";
      },
      error: function (result) {
        console.log(result);
      },
    });
  }

  const houses = useMemo(() => generateHouses(center), [center]);

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <PlaceDetail
          setCurrentLocation={(position) => {
            setCurrentLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        <br />
        {!currentLocation && <p>Enter the address of your office.</p>}
        <br />
        {directions && <Distance leg={directions.routes[0].legs[0]} />}

        <button onClick={handleLogout} className="btn logout">
          Logout
        </button>
      </div>

      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {/* Renderiza o marcador da localização corrente, se existir */}
          {currentLocation && (
            <>
              <Marker
                position={currentLocation}
                // ícone personalizado, se necessário
                // icon={image}
                onClick={() => {
                  // Lógica ao clicar no marcador da localização corrente, se necessário
                }}
              />

              {/* Renderiza marcadores para os clientes */}
          {data.dados.map((cliente) => (
            <Marker
              key={cliente.id_cliente}
              position={{
                lat: parseFloat(cliente.latitude),
                lng: parseFloat(cliente.longitude),
              }}
              onClick={() => {
                // Lógica ao clicar no marcador do cliente, se necessário
              }}
            />
          ))}

              <Circle
                center={currentLocation}
                radius={1500}
                options={closeOptions}
              />

              <Circle
                center={currentLocation}
                radius={2000}
                options={middleOptions}
              />

              <Circle
                center={currentLocation}
                radius={2500}
                options={farOptions}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};

const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
