import { useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/Landing_Page/LandingPage'
import { Outlet } from 'react-router-dom'
import PopUp from './Components/Popup/PopUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <Navbar />
      <Outlet />
      <PopUp />
    </div>
  )
}

export default App
