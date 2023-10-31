import { Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Home from './components/home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
