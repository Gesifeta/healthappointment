import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <main>
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Home