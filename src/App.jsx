import { useState } from 'react'

import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/Landing_Page/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  )
}

export default App
