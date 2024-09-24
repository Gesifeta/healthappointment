import { useNavigate, NavLink } from "react-router-dom"
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
                        <NavLink to="/home" className="link-item">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" className="link-item">Appointments</NavLink>
                    </li>
                    <li>
                        <NavLink to="#healthblogs" className="link-item">Health Blogs</NavLink>
                    </li>
                    <li>
                        <NavLink to="/review/doctor" className="link-item">Reviews</NavLink>
                    </li>
                    <li>

                        {authToken ? <a className="link-item profile" onClick={() => navigate("/profile", { replace: true })}>Welcome, {name}</a> : <a className="link-item btn-primary" onClick={() => navigate("/register", { replace: true })}>Sign Up</a>}
                    </li>
                    <li>
                        {authToken ? <a className="link-item btn-primary" onClick={() => {
                            sessionStorage.clear();
                            localStorage.clear();
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