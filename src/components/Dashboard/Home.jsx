import { useLoadScript } from '@react-google-maps/api';
import LocationMap from '../Mapa/Map';

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdQZtDgTu7ybq7GzoOgKhNw1PT7JKexLg",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  
  return <LocationMap />;
}