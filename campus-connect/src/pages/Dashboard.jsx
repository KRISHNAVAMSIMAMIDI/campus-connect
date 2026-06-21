import { useState, useEffect } from "react";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";

import {
  getAllClubs,
  getAllEvents,
  getAllRecruitments,
  getAnnouncements,
} from "../services/api";

import "./Dashboard.css";

function Dashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [recruitments, setRecruitments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [notificationCount, setNotificationCount] =
    useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const outlet = useOutlet();

  const isClubProfile =
    location.pathname === "/dashboard/club-profile";

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    closeProfileMenu();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          clubsRes,
          eventsRes,
          recruitmentsRes,
          announcementsRes,
        ] = await Promise.all([
          getAllClubs(),
          getAllEvents(),
          getAllRecruitments(),
          getAnnouncements(),
        ]);

        setClubs(clubsRes.data);
        setEvents(eventsRes.data);
        setRecruitments(recruitmentsRes.data);
        setNotificationCount(
          announcementsRes.data.length
        );
        setAnnouncements(
          [...announcementsRes.data]
            .sort((a, b) => {
              return (
                new Date(
                  b.date || b.createdAt || 0
                ) -
                new Date(
                  a.date || a.createdAt || 0
                )
              );
            })
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`dashboard${
        isClubProfile
          ? " dashboard-scroll-page"
          : ""
      }`}
    >
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            &lt;
          </button>

          <img
            src="/image.png"
            alt="College Logo"
            className="logo"
          />

          <div className="header-title">
            <h2>Gayatri Vidya Parishad College of Engineering</h2>
            <p>CampusConnect Portal</p>
          </div>
        </div>

        <div className="header-right">
          <div className="notification-wrapper">
            <button
              className="icon-btn"
              onClick={() =>
                navigate(
                  "/dashboard/notifications"
                )
              }
            >
              !
            </button>

            <span className="notification-badge">
              {notificationCount}
            </span>
          </div>

          <div className="profile-container">
            <button
              className="icon-btn"
              onClick={() =>
                setShowProfileMenu(
                  !showProfileMenu
                )
              }
            >
              P
            </button>

            {showProfileMenu && (
              <div className="profile-menu">
                <p
                  onClick={() => {
                    navigate(
                      "/dashboard/profile"
                    );
                    setShowProfileMenu(false);
                  }}
                >
                  Profile
                </p>

                <p
                  onClick={() => {
                    navigate(
                      "/dashboard/settings"
                    );
                    closeProfileMenu();
                  }}
                >
                  Settings
                </p>

                <p
                  onClick={() => {
                    navigate(
                      "/dashboard/help"
                    );
                    closeProfileMenu();
                  }}
                >
                  Help
                </p>

                <p onClick={handleLogout}>
                  Logout
                </p>
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
            className={
              location.pathname ===
              "/dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className={
              location.pathname ===
              "/dashboard/clubs"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate("/dashboard/clubs")
            }
          >
            Clubs
          </button>

          <button
            className={
              location.pathname ===
              "/dashboard/events"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate("/dashboard/events")
            }
          >
            Events
          </button>

          <button
            className={
              location.pathname ===
              "/dashboard/recruitments"
                ? "active"
                : ""
            }
            onClick={() =>
              navigate(
                "/dashboard/recruitments"
              )
            }
          >
            Recruitments
          </button>

        </aside>

        {/* CONTENT */}
        <main className="content">
          {outlet || (
            <>
              {/* ANNOUNCEMENTS */}
              <section>
                <h2>
                  Announcements
                </h2>

                {announcements.length === 0 ? (
                  <div className="announcement">
                    No announcements yet.
                  </div>
                ) : (
                  announcements.map((announcement) => (
                    <div
                      className="announcement"
                      key={
                        announcement.id ||
                        announcement.announcementId ||
                        `${announcement.title}-${announcement.date}`
                      }
                    >
                      <h4>{announcement.title}</h4>
                      <p>{announcement.message}</p>
                      <p>
                        {announcement.clubName ||
                          "Campus Connect"}
                        {" | "}
                        {announcement.date ||
                          announcement.createdAt ||
                          ""}
                      </p>
                    </div>
                  ))
                )}
              </section>

              {/* ACTIVE CLUBS */}
              <section>
                <h2>Active Clubs</h2>

                <div className="cards">
                  {clubs
                    .slice(0, 2)
                    .map((club) => (
                      <div
                        className="poster"
                        key={club.id}
                      >
                        <img
                          src={
                            club.bannerUrl ||
                            "https://picsum.photos/400/200"
                          }
                          alt={club.name}
                        />

                        <h4>{club.name}</h4>

                        <p>
                          {club.tagline}
                        </p>

                        <button
                          onClick={() =>
                            navigate(
                              "/dashboard/clubs"
                            )
                          }
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                </div>
              </section>

              {/* ACTIVE RECRUITMENTS */}
              <section>
                <h2>
                  Active Recruitments
                </h2>

                {recruitments
                  .slice(0, 2)
                  .map((item) => (
                    <div
                      className="alert-card"
                      key={item.id}
                    >
                      <h4>
                        {item.clubName}
                        {" - "}
                        {item.role}
                      </h4>

                      <p>
                        Team :
                        {" "}
                        {item.team}
                      </p>

                      <p>
                        Deadline :
                        {" "}
                        {item.deadline}
                      </p>

                      <button
                        onClick={() =>
                          navigate(
                            "/dashboard/recruitments"
                          )
                        }
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
              </section>

{/* UPCOMING EVENTS */}
<section>
  <h2>Upcoming Events</h2>

  <div className="cards">
    {events.slice(1, 3).map((event) => (
      <div className="poster" key={event.id}>
        <img
          src={
            event.imageUrl
              ? event.imageUrl
              : "https://picsum.photos/400/200"
          }
          alt={event.eventName}
        />

        <h4>{event.eventName}</h4>

        <p>
          <strong>Venue:</strong> {event.venue}
        </p>

        <p>
          <strong>Date:</strong> {event.eventDate}
        </p>

        <button
          onClick={() =>
            navigate("/dashboard/events")
          }
        >
          View Event
        </button>
      </div>
    ))}
  </div>
</section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
