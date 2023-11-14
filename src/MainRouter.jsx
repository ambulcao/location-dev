import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Dashboard/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  // Adicione mais rotas conforme necessário
];

const router = createBrowserRouter({ routes });

function MainRouter() {
  return (
    <RouterProvider router={router} />
  );
}

export default MainRouter;
