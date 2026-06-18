import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  sendOtp,
  verifyOtp
} from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    passoutYear: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "email") {
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
    }
  };

  const handleSendOtp = async () => {
    if (!form.email.endsWith("@gvpce.ac.in")) {
      alert("Please use your college email.");
      return;
    }

    try {
      await sendOtp(form.email);

      setOtpSent(true);
      setOtpVerified(false);

      alert("OTP sent successfully!");

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      alert("Please enter OTP.");
      return;
    }

    try {
      await verifyOtp(form.email, otp);

      setOtpVerified(true);

      alert("OTP verified successfully!");

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Invalid or expired OTP"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify your OTP first.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerUser({
        name: form.name,
        rollNumber: form.rollNumber,
        branch: form.branch,
        passoutYear: Number(form.passoutYear),
        email: form.email,
        password: form.password
      });

      alert("Registration Successful!");

      navigate("/");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="register-page">

      <form className="register-card" onSubmit={handleSubmit}>

        <h2 className="register-title">
          Create Account
        </h2>

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Roll Number</label>

            <input
              type="text"
              name="rollNumber"
              placeholder="Enter Roll Number"
              value={form.rollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Branch</label>

            <select
              name="branch"
              value={form.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CSE-AIML">CSE-AIML</option>
              <option value="CSBS">CSBS</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Pass-out Year</label>

            <select
              name="passoutYear"
              value={form.passoutYear}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>

          <div className="form-group">
            <label>College Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter College Email"
              value={form.email}
              onChange={handleChange}
              disabled={otpVerified}
              required
            />
          </div>

        </div>

        <div className="otp-section">

          <button
            type="button"
            className="otp-btn"
            onClick={handleSendOtp}
            disabled={otpVerified}
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>

          {otpSent && !otpVerified && (
            <div className="form-row">

              <div className="form-group">
                <label>Enter OTP</label>

                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>&nbsp;</label>

                <button
                  type="button"
                  className="otp-btn"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </div>

            </div>
          )}

          {otpVerified && (
            <p className="otp-success">
              ✓ Email verified successfully
            </p>
          )}

        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="register-btn"
          disabled={!otpVerified}
        >
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