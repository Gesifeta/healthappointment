import React, { useEffect, useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/Landing_Page/LandingPage'
import { Outlet, useNavigate } from 'react-router-dom'
import PopUp from './Components/Popup/PopUp'
import Home from './Components/Home/Home'

function App() {
  const navigate = useNavigate();
  return (
    <div className='app'>
      <Navbar />
      <Outlet />
      <PopUp />
    </div>
  )
}

export default App
