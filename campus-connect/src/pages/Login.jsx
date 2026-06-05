import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (

    <div className="login-page">

      {/* LEFT SECTION */}
      <div className="left-section">

        <div className="circle-one"></div>
        <div className="circle-two"></div>

        <div className="left-content">

          <h1 className="title">
            Campus
            <br />
            Connect
          </h1>

          <p className="description">

            Campus Connect is a centralized college community platform
            that helps students discover clubs, participate in events,
            explore recruitments, and stay connected with campus
            activities through one modern digital ecosystem.

          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="right-section">

        <form className="login-card">

          <h2 className="login-title">
            Login
          </h2>

          <label>
            College Email
          </label>

          <input
            type="email"
            placeholder="student@gvp.edu"
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button type="submit">
            Login
          </button>

          <p className="register-text">

          Don’t have an account?

          <span onClick={() => navigate("/register")}>
            Register
          </span>

        </p>
        </form>

      </div>

    </div>

  );
}

export default Login;