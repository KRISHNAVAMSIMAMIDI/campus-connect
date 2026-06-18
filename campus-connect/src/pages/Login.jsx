import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
        role,
      });

      const payload = response.data;
      const user = payload?.user ?? payload;

      console.log("login response", payload, user);

      const selectedRoleMap = {
        student: "STUDENT",
        "club-admin": "CLUB_ADMIN",
        "event-organizer": "EVENT_ORGANIZER",
      };

      const selectedRole = selectedRoleMap[role];
      const actualRole = user?.role?.toString().toUpperCase();

      if (!actualRole) {
        alert("Login failed: role is missing from server response.");
        return;
      }

      if (selectedRole !== actualRole) {
        alert("Selected role does not match your account role. Please choose the correct role before login.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(response.data));

      let destination = "/dashboard";

      if (actualRole.includes("CLUB_ADMIN")) {
        destination = "/club-admin";
      } else if (actualRole.includes("EVENT_ORGANIZER")) {
        destination = "/event-organizer";
      } else if (actualRole.includes("SUPER_ADMIN")) {
        destination = "/super-admin";
      }

      navigate(destination);

    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">

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

      <div className="right-section">

        <form className="login-card" onSubmit={handleLogin}>

          <h2 className="login-title">Login</h2>

          <div className="input-group">

            <label>Select Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="club-admin">Club Admin</option>
              <option value="event-organizer">Event Organizer</option>
            </select>

          </div>

          <label>College Email</label>

          <input
            type="email"
            placeholder="student@gvp.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

          <p className="register-text">
            Don't have an account?

            <span
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
