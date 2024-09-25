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
import BookingConstultation from './Components/BookingConsultation/BookingConstultation.jsx'
import LandingPage from './Components/Landing_Page/LandingPage.jsx'
import PopUp from './Components/Popup/PopUp.jsx'
import ReviewForm from './Components/ReviewForm/ReviewForm.jsx'
import ProfileCard from './Components/ProfileCard/ProfileCard.jsx'

//create routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <LandingPage />
      },
      {
        path: "/consultation",
        element: <BookingConstultation />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/search/:bookingType",
        element: <FindDoctorSearch />
      },
      {
        path: "/appointment/:email",
        element: <AppointmentForm />
      },
      {
        path: "/doctor/:id",
        element: <PopUp />
      },
      {
        path: "/booking/:email",
        element: <PopUp />
      },
      {
        path: "/review/doctor",
        element: <ReviewForm />
      },
      {
        path: "/user/profile/:email",
        element: <ProfileCard />
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
