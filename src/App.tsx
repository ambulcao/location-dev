import "./App.css";
//import AppRoutes from "./routes";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
//import  Home  from './components/home';
//import dotenv from 'dotenv';

//dotenv.config();

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
     )
}


