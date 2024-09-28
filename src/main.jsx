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
import ReportForm from './Components/ReportsLayout/ReportsLayout.jsx'
import Home from './Components/Home/Home.jsx'
import SelfCheckup from './Components/SelfCheckup/SelfCheckup.jsx'

//create routes

const router = createBrowserRouter([

  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/landing",
        element: <LandingPage />,
      },
      {
        path: "/home/consultation",
        element: <BookingConstultation />
      },
      {
        path: "/home/appointment",
        element: <FindDoctorSearch />
      }
      ,
      {
        path: "/home/login",
        element: <Login />,
      },
      {
        path: "/home/register",
        element: <SignUp />,
      },
      {
        path: "/home/search/:bookingType",
        element: <FindDoctorSearch />
      },
      {
        path: "/home/appointment/:email",
        element: <AppointmentForm />
      },
      {
        path: "/home/doctor/:id",
        element: <PopUp />
      },
      {
        path: "/home/booking/:email",
        element: <PopUp />
      },
      {
        path: "/home/review/doctor",
        element: <ReviewForm />
      },
      {
        path: "/home/user/profile/:email",
        element: <ProfileCard />
      },
      {
        path: "/home/reports",
        element: <ReportForm />
      },
      {
        path: "/home/self_checkup",
        element: <SelfCheckup />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
