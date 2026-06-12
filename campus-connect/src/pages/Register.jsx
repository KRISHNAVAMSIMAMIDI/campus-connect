import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";// adjust path if needed

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      console.log(response.data);

      alert("Registration Successful!");

      // Go to Login Page
      navigate("/");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Registration Failed");
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="register-page">

      <form className="register-card" onSubmit={handleSubmit}>

        <h2 className="register-title">
          Create Account
        </h2>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

        <p className="login-text">
          Already have an account?
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>

      </form>

    </div>
  );
}

export default Register;