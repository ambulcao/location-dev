import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer
} from '@react-google-maps/api'
//import '../App.css'
import  PlaceDetail  from './placeDetail';

//import Distance from './distance'

type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions


export default function LocationMap() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo<MapOptions>(() => ({
    mapId: "13a84d305d69091b",
    disableDefaultUI: true,
    clickableIcons: false,
  }), [] )
  /*const onLoad = useCallback((map: GoogleMap) => {
    mapRef.current = map;
  }, []);*/
  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const houses = useMemo(() => generateHouses(center), [center]) 
  const image = "https://developers.google.com/maps/documentation/javascript/exemples/full/images/beachflag.png";
        
  return <div className='container'>
    <div className='controls'>
      <h1>Commute?</h1>
      <PlaceDetail setOffice={(position) => {
        setOffice(position)
        mapRef.current?.panTo(position)
      }} />
    </div>
    <div className='map'>
      
      <GoogleMap 
        zoom={10} 
        center={ center }
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
      >
        
        { office && ( 
          <>
            <Marker 
              position={office} /*icon={image}*/ 
            />
            
            <MarkerClusterer>
              {clusterer => houses.map((house) => (
                <Marker 
                  key={house.lat} 
                  position={house} 
                  clusterer={clusterer}
                />
            ))}
            </MarkerClusterer>

            <Circle
              center={office}
              radius={1500}
              options={closeOptions}
            />

            <Circle
              center={office}
              radius={2000}
              options={middleOptions}
            />

            <Circle
              center={office}
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