import { useState } from "react";
import "./SuperAdminDashboard.css";

import CreateClub from "../components/CreateClub";

function SuperAdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

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
                <p>Club Admins</p>
              </div>
            </div>
          </>
        );

      case "Create Club":
        return <CreateClub />;

      case "Manage Clubs":
        return (
          <>
            <h1>Manage Clubs</h1>

            <div className="itemCard">
              <h3>Coding Club</h3>
              <p>Club Admin : Nani</p>
            </div>

            <div className="itemCard">
              <h3>Robotics Club</h3>
              <p>Club Admin : Sai</p>
            </div>
          </>
        );

      case "Manage Events":
        return (
          <>
            <h1>Manage Events</h1>

            <div className="itemCard">
              <h3>Hackathon 2026</h3>
              <p>Pending Approval</p>
            </div>
          </>
        );

      case "Users":
        return (
          <>
            <h1>Users</h1>

            <div className="itemCard">
              <h3>Nani</h3>
              <p>STUDENT, CLUB_ADMIN</p>
            </div>

            <div className="itemCard">
              <h3>Sai</h3>
              <p>STUDENT</p>
            </div>
          </>
        );

      case "Notifications":
        return (
          <>
            <h1>Notifications</h1>

            <textarea
              className="textarea"
              placeholder="Enter announcement..."
            />

            <button className="sendBtn">
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
                <p>Club Participation</p>
              </div>

              <div className="card">
                <h2>84%</h2>
                <p>Event Attendance</p>
              </div>

              <div className="card">
                <h2>1200</h2>
                <p>Monthly Users</p>
              </div>
            </div>
          </>
        );

      case "Settings":
        return (
          <>
            <h1>Settings</h1>

            <div className="settings-card">
              <h3>Super Admin Settings</h3>

              <p>
                Manage application level
                configurations.
              </p>
            </div>
          </>
        );

      default:
        return <h1>Dashboard</h1>;
    }
  };

  return (
    <div className="super-admin-container">

      <aside className="super-admin-sidebar">

        <h2 className="logo">
          CampusConnect
        </h2>

        <ul className="menu">

          {[
            "Dashboard",
            "Create Club",
            "Manage Clubs",
            "Manage Events",
            "Users",
            "Notifications",
            "Analytics",
            "Settings"
          ].map((item) => (
            <li
              key={item}
              className={
                activePage === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActivePage(item)
              }
            >
              {item}
            </li>
          ))}

        </ul>

      </aside>

      <main className="super-admin-content">
        {renderContent()}
      </main>

    </div>
  );
}

export default SuperAdminDashboard;