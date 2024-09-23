import { StrictMode } from 'react'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/Sign_Up/SignUp.jsx'
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch.jsx'
import AppointmentForm from './Components/AppointmentForm/AppointmentForm.jsx'

//create routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/search",
        element: <FindDoctorSearch />
      },
      {
        path: "/appointment/:email",
        element: <AppointmentForm />
      },
      {
        path: "/profile",
        element: <h1>Profile</h1>
      },
      {
        path: "/chat",
        element: <h1>Chat</h1>
      }

    ],
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
