import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './Components/Dashboard'
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/homepage",
      element: <HomePage />
    },
    {
      path: "/signup",
      element: <Signup />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
