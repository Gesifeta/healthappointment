import { useNavigate, NavLink } from "react-router-dom"
import { images } from "../../assets"
import './Navbar.css'
import "../ProfileCard/ProfileCard.css"
import { useState } from "react"

const Navbar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [authToken, setAuthToken] = useState(
        sessionStorage.getItem("auth-token"))
    const name = sessionStorage.getItem("name") !== "undefined" ? sessionStorage.getItem("name") : "";
    const email = sessionStorage.getItem("email") !== "undefined" ? sessionStorage.getItem("email") : "";
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
                    <li className="app__profile"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        {authToken ? <>
                            <span className="profile" >Welcome, {name}</span>
                            {showProfileMenu &&
                                <ul className="profile-menu"
                                    onMouseLeave={() => setShowProfileMenu(false)}
                                >
                                    {["Profile", "Reports", "Logout"].map((profile, index) => (
                                        <li key={index}
                                            onClick={() => {
                                                setShowProfileMenu(false)
                                                navigate(`/user/${profile.toLowerCase()}/${email}`)
                                            }}
                                        >{profile}</li>
                                    ))}
                                </ul>
                            }

                        </> : <button className="link-item btn-primary" onClick={() => navigate("/register", { replace: true })}>Sign Up</button>}
                    </li>
                    <li>
                        {authToken ? <button className="link-item btn-primary" onClick={() => {
                            sessionStorage.clear();
                            localStorage.clear();
                            setAuthToken(null);
                            window.location.reload();
                            navigate("/", { replace: true })
                        }}>Logout</button> : <button className="link-item btn-primary" onClick={() => {
                            navigate("/login", { replace: true })

                        }}>Log In</button>}
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar