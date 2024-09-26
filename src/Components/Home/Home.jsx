import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import LandingPage from '../Landing_Page/LandingPage'

function Home() {
    return (
        <main>
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Home