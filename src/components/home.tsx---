import { useLoadScript } from '@react-google-maps/api'
import  LocationMap from './map'; 

export default function Home() {

  const { isLoaded } = useLoadScript({
    //googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    googleMapsApiKey: "AIzaSyCdQZtDgTu7ybq7GzoOgKhNw1PT7JKexLg",
    libraries: ["places"],
  }) 

  if(!isLoaded)  return <div>Loading...</div>
  return <LocationMap/>
}
