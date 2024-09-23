import { useNavigate } from "react-router-dom"
import { images } from "../../assets"
import './Navbar.css'
import { useState } from "react"

const Navbar = () => {
    const [authToken, setAuthToken] = useState(
        sessionStorage.getItem("auth-token"))
    const name = sessionStorage.getItem("name")
    const navigate = useNavigate();
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
                        <a href="#appointments" className="link-item">Appointments</a>
                    </li>
                    <li>
                        <a href="#healthblogs" className="link-item">Health Blogs</a>
                    </li>
                    <li>
                        <a href="#reviews" className="link-item">Reviews</a>
                    </li>
                    <li>

                        {authToken ? <a className="link-item profile" onClick={() => navigate("/profile", { replace: true })}>Welcome, {name}</a> : <a className="link-item btn-primary" onClick={() => navigate("/register", { replace: true })}>Sign Up</a>}
                    </li>
                    <li>
                        {authToken ? <a className="link-item btn-primary" onClick={() => {
                            sessionStorage.clear();
                            setAuthToken(null);
                            window.location.reload();
                            navigate("/", { replace: true })
                        }}>Logout</a> : <a className="link-item btn-primary" onClick={() => navigate("/login", { replace: true })}>Log In</a>}
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar