import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function EventOrganizerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            &lt;
          </button>

          <img
            src="https://via.placeholder.com/50"
            alt="College Logo"
            className="logo"
          />

          <div>
            <h2>Event Organizer</h2>
            <p>CampusConnect</p>
          </div>
        </div>

        <div className="header-right">
          <div className="notification-wrapper">
            <button
              className="icon-btn"
              onClick={() => navigate("/dashboard/notifications")}
            >
              !
            </button>

            <span className="notification-badge">2</span>
          </div>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <button className="active">My Events</button>
          <button onClick={() => navigate("/dashboard/events")}>Browse Events</button>
          <button onClick={() => navigate("/dashboard/notifications")}>Notifications</button>
        </aside>

        <main className="content">
          <section>
            <h2>Event Organizer Dashboard</h2>
            <p>Manage your events, registrations, and schedule from one place.</p>
          </section>

          <section>
            <div className="cards">
              <div className="poster">
                <h4>My Upcoming Events</h4>
                <p>View and edit the events you are organizing.</p>
                <button onClick={() => navigate("/dashboard/events")}>View Events</button>
              </div>

              <div className="poster">
                <h4>Create New Event</h4>
                <p>Set up workshops, tournaments, and campus activities.</p>
                <button>Create Event</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default EventOrganizerDashboard;
