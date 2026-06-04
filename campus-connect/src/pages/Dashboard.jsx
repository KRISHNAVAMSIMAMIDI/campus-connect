import { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <button className="back-btn">←</button>

          <img
            src="C:\Users\nanim\OneDrive\Pictures\Screenshots 1\Screenshot 2026-06-04 164331.png"
            alt="College Logo"
            className="logo"
          />
        </div>

        <div className="header-right">
          <button className="icon-btn">🔔</button>

          <div className="profile-container">
            <button
              className="icon-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              👤
            </button>

            {showProfileMenu && (
              <div className="profile-menu">
                <p>👤 Profile</p>
                <p>⚙ Settings</p>
                <p>❓ Help</p>
                <p>🚪 Logout</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <div className="main-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <button>🏠 Dashboard</button>
          <button>🎯 Clubs</button>
          <button>📅 Events</button>
          <button>📝 Recruitments</button>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="content">
          {/* Featured Clubs */}
          <section>
            <h2>🔥 Featured Clubs</h2>

            <div className="cards">
              <div className="card">
                <h3>Coding Club</h3>
                <p>DSA, Web Development & Hackathons</p>
                <button>Explore</button>
              </div>

              <div className="card">
                <h3>Robotics Club</h3>
                <p>IoT and Robotics Projects</p>
                <button>Explore</button>
              </div>

              <div className="card">
                <h3>Photography Club</h3>
                <p>Creative Photography Activities</p>
                <button>Explore</button>
              </div>
            </div>
          </section>

          {/* Recruitment Alerts */}
          <section>
            <h2>📢 Recruitment Alerts</h2>

            <div className="alert-card">
              <h4>Coding Club Recruitment Open</h4>
              <p>Deadline: June 15</p>
              <button>Apply Now</button>
            </div>

            <div className="alert-card">
              <h4>Robotics Club Hiring</h4>
              <p>Interview Registrations Open</p>
              <button>Apply Now</button>
            </div>
          </section>

          {/* Event Posters */}
          <section>
            <h2>🎉 Event Posters</h2>

            <div className="cards">
              <div className="poster">
                <img src="https://picsum.photos/300/180" alt="Hackathon" />
                <h4>Hackathon 2026</h4>
                <button>Register</button>
              </div>

              <div className="poster">
                <img src="https://picsum.photos/301/180" alt="Workshop" />
                <h4>AI Workshop</h4>
                <button>Register</button>
              </div>
            </div>
          </section>

          {/* Announcements */}
          <section>
            <h2>📌 Announcements</h2>

            <div className="announcement">Placement Drive Starts Next Monday.</div>

            <div className="announcement">
              Photography Contest Results Released.
            </div>

            <div className="announcement">New Clubs Added To CampusConnect.</div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
