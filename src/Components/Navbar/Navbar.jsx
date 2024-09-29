import { useNavigate, NavLink } from "react-router-dom"
import { useState } from "react"

import { images } from "../../assets"
import './Navbar.css'
import "../ProfileCard/ProfileCard.css"


const Navbar = () => {
    let triggerPoint = window.matchMedia("(max-width: 600px)").matches ? true : false;
    window.addEventListener("resize", () => {
        let triggerPoint = window.matchMedia("(max-width: 600px)").matches ? true : false;
        setShowMenu(triggerPoint)
    })
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(triggerPoint)
    const [authToken, setAuthToken] = useState(
        sessionStorage.getItem("auth-token"))
    const name = sessionStorage.getItem("name") !== "undefined" ? sessionStorage.getItem("name") : "";
    const email = sessionStorage.getItem("email") !== "undefined" ? sessionStorage.getItem("email") : "";
    const navigate = useNavigate();

    return (
        <>
            <header className="app-header">
                <img src={images.logoColor} alt="loyo logo" className="app-logo"  onClick={()=>navigate("/",{replace:true})}/>
                <nav className="app-navbar">
                    {!showMenu ?
                        <div className="nav-menu--close" onClick={() => setShowMenu(!showMenu)}>
                            <span className="top"></span><span className="bottom"></span>
                        </div> :
                        <div className="nav-menu" onClick={() => setShowMenu(!showMenu)}>
                            <span></span><span></span><span></span>
                        </div>}
                    {!showMenu ?
                        <ul>
                            <li>
                                <NavLink to="/" className="link-item">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/home/appointment" className="link-item">Appointments</NavLink>
                            </li>
                            <li>
                                <NavLink to="#healthblogs" className="link-item">Health Blogs</NavLink>
                            </li>
                            <li>
                                <NavLink to="/home/reports" className="link-item">Reviews</NavLink>
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
                                            <li>
                                                <NavLink to={`/home/user/profile/${email}`} className="link-item">Profile</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/home/reports" className="link-item">Reports</NavLink>
                                            </li>
                                        </ul>
                                    }

                                </> : <button className="link-item btn-primary" onClick={() => navigate("/home/register", { replace: true })}>Sign Up</button>}
                            </li>
                            <li>
                                {authToken ? <button className="link-item btn-primary" onClick={() => {
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    setAuthToken(null);
                                    window.location.reload();
                                    navigate("/home", { replace: true })
                                }}>Logout</button> : <button className="link-item btn-primary" onClick={() => {
                                    navigate("/home/login", { replace: true })

                                }}>Log In</button>}
                            </li>
                        </ul> : null}
                </nav>
            </header>
        </>
    )
}

export default Navbar