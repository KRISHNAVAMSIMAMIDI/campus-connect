import { useState } from "react";
import { changePassword } from "../services/api";
import "./Settings.css";

const getInitialEmail = () => {
  try {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    return storedUser?.email || storedUser?.user?.email || "";
  } catch {
    return "";
  }
};

function Settings() {
  const [form, setForm] = useState({
    email: getInitialEmail(),
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [status, setStatus] = useState({
    success: "",
    error: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: "", error: "" });

    if (
      !form.email.trim() ||
      !form.currentPassword.trim() ||
      !form.newPassword.trim() ||
      !form.confirmNewPassword.trim()
    ) {
      setStatus({
        success: "",
        error: "Please complete all fields before submitting."
      });
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      setStatus({
        success: "",
        error: "New password and confirm password must match."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await changePassword(
        form.email,
        form.currentPassword,
        form.newPassword
      );

      setStatus({
        success: "Your password has been updated successfully.",
        error: ""
      });

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      }));
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to update password. Please try again.";

      setStatus({ success: "", error: serverMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="settings-page">
      <section className="settings-card">
        <h1>Change Password</h1>

        <form className="password-form" onSubmit={handleSubmit}>
          <div className="password-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="password-field">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
            />
          </div>

          <div className="password-field">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              minLength="6"
              required
            />
          </div>

          <div className="password-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              minLength="6"
              required
            />
          </div>

          {status.success && (
            <p className="status-message success">
              {status.success}
            </p>
          )}

          {status.error && (
            <p className="status-message error">
              {status.error}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Settings;
