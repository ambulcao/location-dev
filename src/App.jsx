import React from 'react';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import MainRouter from './MainRouter';

function App() {
  return <RouterProvider><MainRouter /></RouterProvider>;
}

export default App;
