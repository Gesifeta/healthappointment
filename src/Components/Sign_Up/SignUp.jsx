import { useState } from "react"
import { replace, useNavigate } from "react-router-dom"
import { v4 as uuid } from 'uuid';

import "./Sign_Up.css"
import { API_URL } from "../../config";

const SignUp = () => {
  //create naviation
  const navigate = useNavigate()
  const [showErr, setShowErr] = useState("")
  //create state for form
  const [member, setMember] = useState({
    id: uuid(),
    name: "",
    email: "",
    phone: "",
    password: ""
  })
  const handleInput = (event) => {
    const { name, value } = event.target
    setMember((m) => {
      return { ...m, [name]: value }
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(member)
    })

    let json = await response.json();

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", member.name)
      sessionStorage.setItem("email", member.email)
      sessionStorage.setItem("phone", member.phone);
      window.location.reload()
      navigate("/", { replace: true })
    }
    else {
      if (json.errors) {
        for (let error of json.errors) {
          setShowErr(error.msg)
        }
      }
      else {
        setShowErr(json.error)
      }
    }
  }

  return (
    <div className="container" style={{ "marginTop": "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{
          "textalign": "left"
        }}>
          Already a member? <span><a href="../Login/Login.html" style={{ "color": "#2190FF" }}> Login</a></span>
        </div>
        <div className="signup-form">
          <form method="POST" onSubmit={handleSubmit} >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId"
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" minLength={10} maxLength={10} name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId"
                onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" aria-describedby="helpId"
                onChange={handleInput} />
                {showErr ? <div className="error" style={{ color: "red" }}>{showErr}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId"
                onChange={handleInput} />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
              <button type="reset" className="btn btn-danger" onClick={() => setShowErr("")}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp