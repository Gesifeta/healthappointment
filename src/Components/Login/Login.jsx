import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import "./Login.css"
import { API_URL } from "../../config"
import Loading from "../Loading"



const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  if (sessionStorage.getItem("auth-token")) {
    navigate("/home/", { replace: true })
  }

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: sessionStorage.getItem("name") || ""
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setUser((u) => {
      return { ...u, [name]: value }
    })
    return
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    let json = await response.json();
    if (json.authtoken) {
      setIsLoading(false)
      sessionStorage.setItem('auth-token', json.authtoken)
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("name", json.name);
      navigate("/", { replace: true })
    } else {
      alert("Invalid Credentials")
    }
  }


  return (
    <div className="container" style={{ "marginTop": "5%" }}>
      <div className="login-grid">
        <div className="login-text">
          <h1>Login In</h1>
        </div>
        <div className="login-text1" style={{ "textAlign": "left" }}>
          Are you a new member? <span><NavLink to="/sign_up" style={{ "color": "#2190FF" }}> Sign Up
            Here</NavLink></span>
        </div>
        <div className="login-form">
          <form method="POST" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="form-control"
                placeholder="Enter your email" aria-describedby="helpId"
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required className="form-control"
                placeholder="Enter your password" aria-describedby="helpId"
                onChange={handleInput}
              />

            </div>
            <div className="btn-group">
              <button type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
              <button type="reset" className="btn btn-danger " onClick={() => navigate("/", { replace: true })}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login