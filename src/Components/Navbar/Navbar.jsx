import { images } from "../../assets"
import './Navbar.css'

const Navbar = () => {
    return (
        <header className="app-header">
            <a href="#"><img src={images.logoColor} alt="loyo logo" className="app-logo" /></a>
            <nav className="app-navbar">
                <div className="nav-menu">
                    <span></span><span></span><span></span>
                </div>
                <ul>
                    <li>
                        <a href="#" className="link-item">Home</a>
                    </li>
                    <li>
                        <a href="#" className="link-item">Appointments</a>
                    </li>
                    <li>
                        <a href="#" className="link-item">Health Blogs</a>
                    </li>
                    <li>
                        <a href="#" className="link-item">Reviews</a>
                    </li>
                    <li>
                        <a href="../Sign_up/Sign_Up.html" className="link-item btn-primary">Sign Up</a>
                    </li>
                    <li>
                        <a href="../Login/Login.html" className="link-item btn-primary">Log In</a>
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar