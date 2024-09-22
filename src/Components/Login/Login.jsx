import "./Login.css"

const Login = () => {
  return (
    <div className="container" style={{ "marginTop": "5%" }}>
      <div className="login-grid">
        <div className="login-text">
          <h1>Login In</h1>
        </div>
        <div className="login-text1" style={{ "textAlign": "left" }}>
          Are you a new member? <span><a href="../Sign_Up/Sign_Up.html" style={{ "color": "#2190FF" }}> Sign Up
            Here</a></span>
        </div>
        <div className="login-form">
          <form>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required className="form-control"
                placeholder="Enter your email" aria-describedby="helpId" />            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required className="form-control"
                placeholder="Enter your password" aria-describedby="helpId" />

            </div>
            <div className="btn-group">
              <button type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
              <button type="reset" className="btn btn-danger ">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login