import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="header">

        <div className="header-left">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <img
            src="https://via.placeholder.com/50"
            alt="College Logo"
            className="logo"
          />

          <div>
            <h2>Gayatri Vidya Parishad</h2>
            <p>CampusConnect</p>
          </div>

        </div>

        <div className="header-right">

          <div className="notification-wrapper">

            
            <button
              className="icon-btn"
              onClick={() => navigate("/notifications")}
            >
              🔔
            </button>

            <span className="notification-badge">
              3
            </span>

          </div>

          <div className="profile-container">

            <button
              className="icon-btn"
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
              }
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

          <button
            onClick={() => navigate("/")}
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => navigate("/clubs")}
          >
            🎯 Clubs
          </button>

          <button
            onClick={() => navigate("/events")}
          >
            📅 Events
          </button>

          <button
            onClick={() => navigate("/recruitments")}
          >
            📝 Recruitments
          </button>

        </aside>

        {/* CONTENT */}
        <main className="content">

          {/* Club Advertisements */}
          <section>

            <h2>📢 Club Advertisements</h2>

            <div className="cards">

              <div className="poster">

                <img
                  src="https://picsum.photos/400/200"
                  alt="Coding Club"
                />

                <h4>Web Development Bootcamp</h4>

                <button>
                  View Details
                </button>

              </div>

              <div className="poster">

                <img
                  src="https://picsum.photos/401/200"
                  alt="Robotics Club"
                />

                <h4>National Robotics Challenge</h4>

                <button>
                  Register
                </button>

              </div>

            </div>

          </section>

          {/* Recruitment Notifications */}
          <section>

            <h2>🚀 Recruitment Notifications</h2>

            <div className="alert-card">

              <h4>Coding Club Recruitment Open</h4>

              <p>
                Deadline: June 15
              </p>

              <button>
                Apply Now
              </button>

            </div>

            <div className="alert-card">

              <h4>Photography Club Hiring</h4>

              <p>
                Applications Open
              </p>

              <button>
                Apply Now
              </button>

            </div>

          </section>

          {/* Event Posters */}
          <section>

            <h2>🎉 Event Posters</h2>

            <div className="cards">

              <div className="poster">

                <img
                  src="https://picsum.photos/402/200"
                  alt="Hackathon"
                />

                <h4>Hackathon 2026</h4>

                <button>
                  Register
                </button>

              </div>

              <div className="poster">

                <img
                  src="https://picsum.photos/403/200"
                  alt="Workshop"
                />

                <h4>AI Workshop</h4>

                <button>
                  Register
                </button>

              </div>

            </div>

          </section>

          {/* Upcoming Events */}
          <section>

            <h2>📅 Upcoming Events</h2>

            <div className="cards">

              <div className="card">

                <h3>Hackathon 2026</h3>

                <p>
                  June 20 • Seminar Hall
                </p>

                <button>
                  View Event
                </button>

              </div>

              <div className="card">

                <h3>AI Workshop</h3>

                <p>
                  June 25 • Auditorium
                </p>

                <button>
                  View Event
                </button>

              </div>

            </div>

          </section>

          {/* Announcements */}
          <section>

            <h2>📌 Announcements</h2>

            <div className="announcement">
              Placement Drive Starts Next Monday.
            </div>

            <div className="announcement">
              Photography Contest Results Released.
            </div>

            <div className="announcement">
              New Clubs Added To CampusConnect.
            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;
