import { useLoadScript } from '@react-google-maps/api';
import LocationMap from '../Mapa/Map';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdQZtDgTu7ybq7GzoOgKhNw1PT7JKexLg",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  const Logout = () => {
    window.localStorage.removeItem("isLogedIn")
    navigate('/')
  }

  return ( 
    <div className='home flex'>
      <LocationMap />;

      <button onClick={() => Logout()}></button>
    </div>
  )
}