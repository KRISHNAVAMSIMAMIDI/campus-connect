import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

const notifications = [
  {
    id: 1,
    type: "Recruitment",
    title: "Coding Club recruitment is open",
    message: "Applications close on June 15. Submit your details before the deadline.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "Event",
    title: "AI Workshop registration started",
    message: "Register for the AI workshop scheduled on June 25 in the auditorium.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "Club",
    title: "Photography Club posted results",
    message: "Contest results are available now. Visit the club page for details.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    type: "Announcement",
    title: "Placement drive starts next Monday",
    message: "Check eligibility criteria and keep your resume updated.",
    time: "2 days ago",
    unread: false,
  },
];

function Notifications() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Unread", "Recruitment", "Event", "Club"];
  const unreadCount = notifications.filter((item) => item.unread).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return item.unread;
    return item.type === activeFilter;
  });

  return (
    <main className="notifications-page">
      <header className="notifications-header">
        <button
          className="notifications-back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div>
          <h1>Notifications</h1>
          <p>{unreadCount} unread updates</p>
        </div>
      </header>

      <section className="notifications-panel">
        <div className="notifications-toolbar">
          <div className="notification-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <button className="mark-read-btn">
            Mark all as read
          </button>
        </div>

        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <article
              key={notification.id}
              className={`notification-card ${
                notification.unread ? "unread" : ""
              }`}
            >
              <div className="notification-dot" />

              <div className="notification-content">
                <div className="notification-meta">
                  <span>{notification.type}</span>
                  <small>{notification.time}</small>
                </div>

                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
              </div>

              <button className="notification-action">
                View
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Notifications;
