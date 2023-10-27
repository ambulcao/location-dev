import { Route, Routes } from 'react-router-dom';
import Login from './components/login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
