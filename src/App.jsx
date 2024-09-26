import { useEffect, useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/Landing_Page/LandingPage'
import { Outlet } from 'react-router-dom'
import PopUp from './Components/Popup/PopUp'
import Home from './Components/Home/Home'

function App() {
  const [count, setCount] = useState(0)
useEffect(()=>{
  window.location.href="/home/landing"
},[])

  return (
    <div className='app'>
      <Home/>
      <PopUp />
    </div>
  )
}

export default App
