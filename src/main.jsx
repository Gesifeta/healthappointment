import { StrictMode } from 'react'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/Sign_Up/SignUp.jsx'

//create routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user/new",
    element: <SignUp/>,
  },

  {
    path: "/user/:id",
    element: <App />,
  },
  {
    path: "/user/:id/edit",
    element: <App />,
  },
  {
    path: "/user/:id/destroy",
    element: <App />,
  },
  {
    path: "/contact",
    element: <App />,
  },
  {
    path: "/projects",
    element: <App />,
  },
  {
    path: "/resume",
    element: <App />,
  },
  {
    path: "*",
    element: <App />,
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>,
)
