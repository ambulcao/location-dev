import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoadScript } from '@react-google-maps/api'
import LocationMap from '../Mapa/map'
import { useAuth } from '../Login/AuthContext'

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdQZtDgTu7ybq7GzoOgKhNw1PT7JKexLg",
    libraries: ["places"],
  });

  const { authenticated, logout } = useAuth()

  console.log(authenticated);
  const navigate = useNavigate()

  if (!isLoaded) return <div>Loading...</div>

  const handleLogout = () => {
    logout();
    navigate('/login')
  }
  
  return ( 
    <div className='home flex'>
      {(
          <button onClick={handleLogout} className="btn logout">Logout</button>
      ) && authenticated}
      <LocationMap />
    </div>
  )
}