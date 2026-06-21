import { useEffect, useState } from "react";
import { getAnnouncements } from "../services/api";
import "./Notifications.css";

function Notifications() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAnnouncements();
        setAnnouncements(
          [...response.data].sort((a, b) => {
            return (
              new Date(
                b.date || b.createdAt || 0
              ) -
              new Date(
                a.date || a.createdAt || 0
              )
            );
          })
        );
      } catch (err) {
        console.error("Notifications Error:", err);
        setError(
          "Unable to load announcements."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <h1>Notifications</h1>

      </div>

      <div className="notifications-panel">
        <div className="notifications-list">
          {loading && (
            <div className="notification-card">
              <div className="notification-content">
                <p>Loading announcements...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="notification-card">
              <div className="notification-content">
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            announcements.length === 0 && (
              <div className="notification-card">
                <div className="notification-content">
                  <p>No announcements yet.</p>
                </div>
              </div>
            )}

          {!loading &&
            !error &&
            announcements.map((announcement) => (
              <div
                key={
                  announcement.id ||
                  announcement.announcementId ||
                  `${announcement.title}-${announcement.date}`
                }
                className="notification-card unread"
              >
                <div className="notification-dot" />

                <div className="notification-content">
                  <div className="notification-meta">
                    <span>
                      {announcement.clubName ||
                        "Campus Connect"}
                    </span>
                    <small>
                      {announcement.date ||
                        announcement.createdAt ||
                        ""}
                    </small>
                  </div>

                  <h2>{announcement.title}</h2>
                  <p>{announcement.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}

export default Notifications;
