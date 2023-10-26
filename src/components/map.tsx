import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer
} from '@react-google-maps/api'
//import '../App.css'
import  PlaceDetail  from './placeDetail';
import  Distance  from './distance';

//import Distance from './distance'

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions


export default function LocationMap() {

  const [directions, setDirections] = useState<DirectionsResult>()
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral | null>(null);
  const mapRef = useRef<GoogleMap>()
  const center = useMemo<LatLngLiteral>(() => ({ lat: 41.332434, lng: -8.5273209 }), [])
  const options = useMemo<MapOptions>(() => ({
    mapId: "13a84d305d69091b",
    disableDefaultUI: true,
    clickableIcons: false,
  }), [] )

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }, []);

  /*const onLoad = useCallback((map: GoogleMap) => {
    mapRef.current = map;
  }, []);*/
  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const houses = useMemo(() => generateHouses(center), [center]) 
  const fetchDirections = (house: LatLngLiteral) => {
    if(!currentLocation) return;

    const service = new google.maps.DirectionsService()
    service.route(
      {
        origin: house,
        destination: currentLocation,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if(status === "OK" && result) {
          setDirections(result)
        }
      }
    )
  }
  //const image = "https://developers.google.com/maps/documentation/javascript/exemples/full/images/beachflag.png";
        
  return <div className='container'>
    <div className='controls'>
      <h1>Commute?</h1>
      <PlaceDetail setCurrentLocation={(position) => {
        setCurrentLocation(position)
        mapRef.current?.panTo(position)
      }} />
    </div>

    {!currentLocation && <p>Enter the address of your office.</p>}

    {directions && <Distance leg={directions.routes[0].legs[0]}/>}

    <div className='map'>
      
      <GoogleMap 
        zoom={10} 
        center={ center }
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
      >
        
        {directions && <DirectionsRenderer directions={directions} options={{
          polylineOptions: {
            zIndex: 50,
            strokeColor: "#1976D2",
            strokeWeight: 5,
          }
        }} />}

        { currentLocation && ( 
          <>
            <Marker 
              position={currentLocation} /*icon={image}*/ 
            />
            
            <MarkerClusterer>
              {(clusterer) => (
                  <>
                    {houses.map(house => (
                      <Marker
                        key={house.lat}
                        position={house}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(house);
                        }}
                      />
                    ))}
                  </>
                )}
            </MarkerClusterer>


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
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
}

const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
}

const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
}

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for(let i=0; i<100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }
  return _houses
}