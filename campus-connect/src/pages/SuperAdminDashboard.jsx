import { useState } from "react";
import "./SuperAdminDashboard.css";

function SuperAdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const clubs = [
    { id: 1, name: "Coding Club", status: "Pending" },
    { id: 2, name: "Robotics Club", status: "Approved" }
  ];

  const events = [
    { id: 1, name: "Hackathon 2026", status: "Pending" },
    { id: 2, name: "Tech Fest", status: "Approved" }
  ];

  const users = [
    { id: 1, name: "Rahul", role: "Student" },
    { id: 2, name: "Priya", role: "Club Admin" }
  ];

  const approve = (name) => {
    alert(`${name} Approved Successfully`);
  };

  const reject = (name) => {
    alert(`${name} Rejected`);
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <>
            <h1>Dashboard</h1>

            <div className="cards">
              <div className="card">
                <h2>2500</h2>
                <p>Students</p>
              </div>

              <div className="card">
                <h2>18</h2>
                <p>Clubs</p>
              </div>

              <div className="card">
                <h2>35</h2>
                <p>Events</p>
              </div>

              <div className="card">
                <h2>12</h2>
                <p>Pending Requests</p>
              </div>
            </div>
          </>
        );

      case "Manage Clubs":
        return (
          <>
            <h1>Manage Clubs</h1>

            {clubs.map((club) => (
              <div className="itemCard" key={club.id}>
                <h3>{club.name}</h3>
                <p>Status: {club.status}</p>

                <button
                  className="approve"
                  onClick={() => approve(club.name)}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => reject(club.name)}
                >
                  Reject
                </button>
              </div>
            ))}
          </>
        );

      case "Manage Events":
        return (
          <>
            <h1>Manage Events</h1>

            {events.map((event) => (
              <div className="itemCard" key={event.id}>
                <h3>{event.name}</h3>
                <p>Status: {event.status}</p>

                <button
                  className="approve"
                  onClick={() => approve(event.name)}
                >
                  Approve Event
                </button>

                <button
                  className="reject"
                  onClick={() => reject(event.name)}
                >
                  Reject Event
                </button>
              </div>
            ))}
          </>
        );

      case "Users":
        return (
          <>
            <h1>User Management</h1>

            {users.map((user) => (
              <div className="itemCard" key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.role}</p>

                <button
                  className="approve"
                  onClick={() => alert(`${user.name} Updated`)}
                >
                  Update Role
                </button>

                <button
                  className="reject"
                  onClick={() => alert(`${user.name} Removed`)}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        );

      case "Notifications":
        return (
          <>
            <h1>Global Notifications</h1>

            <textarea
              className="textarea"
              placeholder="Enter announcement..."
            ></textarea>

            <button
              className="sendBtn"
              onClick={() => alert("Notification Sent")}
            >
              Send Notification
            </button>
          </>
        );

      case "Analytics":
        return (
          <>
            <h1>Analytics</h1>

            <div className="cards">
              <div className="card">
                <h2>95%</h2>
                <p>Event Participation</p>
              </div>

              <div className="card">
                <h2>82%</h2>
                <p>Club Engagement</p>
              </div>

              <div className="card">
                <h2>1200</h2>
                <p>Monthly Logins</p>
              </div>
            </div>
          </>
        );

      case "Settings":
        return (
          <>
            <h1 className="settings-heading">Settings</h1>

            <div className="settings-card">
              <div className="setting-item">
                <h3>Theme Settings</h3>
                <p>Manage colors, appearance, and layout.</p>
              </div>

              <div className="setting-item">
                <h3>Security Settings</h3>
                <p>Control passwords, authentication, and access.</p>
              </div>

              <div className="setting-item">
                <h3>System Configuration</h3>
                <p>Manage application-level configurations.</p>
              </div>
            </div>
          </>
        );

      default:
        return <h1>Dashboard</h1>;
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="logo">Campus Connect</h2>

        <ul className="menu">
          {[
            "Dashboard",
            "Manage Clubs",
            "Manage Events",
            "Users",
            "Notifications",
            "Analytics",
            "Settings"
          ].map((item) => (
            <li
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default SuperAdminDashboard;