import { ChakraProvider } from '@chakra-ui/react'
import "./App.css";
import  Home  from './components/home';
//import dotenv from 'dotenv';

//dotenv.config();

export default function App() {
  return (
    <ChakraProvider>
      <Home/>
    </ChakraProvider>
     )
}
