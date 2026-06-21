import { useEffect, useState } from "react";
import "./SuperAdminDashboard.css";

import CreateClub from "../components/CreateClub";
import {
  approveAdminEvent,
  deleteAdminClub,
  deleteAdminEvent,
  deleteAdminUser,
  getAdminAnalytics,
  getAdminClubs,
  getAdminDashboard,
  getAdminEvents,
  getAdminUsers,
  rejectAdminEvent,
  sendAdminNotification,
  updateAdminClub,
  updateAdminUserRole,
} from "../services/api";

const getList = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.content)) {
    return data.content;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

const getValue = (...values) => {
  return values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );
};

function SuperAdminDashboard() {
  const [activePage, setActivePage] =
    useState(() => {
      return (
        localStorage.getItem("superAdminActivePage") ||
        "Dashboard"
      );
    });

  const [dashboard, setDashboard] =
    useState(null);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] =
    useState(null);
  const [notification, setNotification] =
    useState("");
  const [editingClubId, setEditingClubId] =
    useState(null);
  const [editClub, setEditClub] = useState({
    name: "",
    faculty: "",
    clubAdminEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const loadDashboard = async () => {
    const response = await getAdminDashboard();
    setDashboard(response.data);
  };

  const loadClubs = async () => {
    const response = await getAdminClubs();
    setClubs(getList(response.data));
  };

  const loadEvents = async () => {
    const response = await getAdminEvents();
    setEvents(getList(response.data));
  };

  const loadUsers = async () => {
    const response = await getAdminUsers();
    setUsers(getList(response.data));
  };

  const loadAnalytics = async () => {
    const response = await getAdminAnalytics();
    setAnalytics(response.data);
  };

  useEffect(() => {
    localStorage.setItem(
      "superAdminActivePage",
      activePage
    );

    const loadPageData = async () => {
      clearMessages();
      setLoading(true);

      try {
        if (activePage === "Dashboard") {
          await loadDashboard();
        }

        if (activePage === "Manage Clubs") {
          await loadClubs();
        }

        if (activePage === "Manage Events") {
          await loadEvents();
        }

        if (activePage === "Users") {
          await loadUsers();
        }

        if (activePage === "Analytics") {
          await loadAnalytics();
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [activePage]);

  const handleDeleteClub = async (clubId) => {
    clearMessages();

    try {
      await deleteAdminClub(clubId);
      await loadClubs();
      setSuccess("Club deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete club."
      );
    }
  };

  const handleStartEditClub = (club) => {
    const clubId = getValue(club.id, club.clubId);

    if (!clubId) {
      setError("Unable to edit club without an ID.");
      return;
    }

    clearMessages();
    setEditingClubId(clubId);
    setEditClub({
      name: getValue(club.name, club.clubName, ""),
      faculty: getValue(
        club.faculty,
        club.facultyCoordinator,
        ""
      ),
      clubAdminEmail: getValue(
        club.clubAdminEmail,
        club.adminEmail,
        club.admin?.email,
        ""
      ),
    });
  };

  const handleEditClubChange = (event) => {
    setEditClub({
      ...editClub,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancelEditClub = () => {
    setEditingClubId(null);
    setEditClub({
      name: "",
      faculty: "",
      clubAdminEmail: "",
    });
  };

  const handleUpdateClub = async (event) => {
    event.preventDefault();
    clearMessages();

    if (!editingClubId) {
      setError("Unable to update club without an ID.");
      return;
    }

    setLoading(true);

    try {
      await updateAdminClub(editingClubId, editClub);
      await loadClubs();
      handleCancelEditClub();
      setSuccess("Club updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update club."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApproveEvent = async (eventId) => {
    clearMessages();
    setLoading(true);

    try {
      await approveAdminEvent(eventId);
      await loadEvents();
      setSuccess("Event approved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to approve event."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRejectEvent = async (eventId) => {
    clearMessages();
    setLoading(true);

    try {
      await rejectAdminEvent(eventId);
      await loadEvents();
      setSuccess("Event rejected successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reject event."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    clearMessages();
    setLoading(true);

    try {
      await deleteAdminEvent(eventId);
      await loadEvents();
      setSuccess("Event deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete event."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeUserRole = async (user) => {
    const userId = getValue(user.id, user.userId);
    const currentRole = Array.isArray(user.roles)
      ? user.roles[0]
      : getValue(user.role, user.roles, "USER");

    if (!userId) {
      setError("Unable to update user without an ID.");
      return;
    }

    const newRole = window.prompt(
      "Enter new role",
      currentRole
    );

    if (!newRole || newRole.trim() === currentRole) {
      return;
    }

    clearMessages();
    setLoading(true);

    try {
      await updateAdminUserRole(
        userId,
        newRole.trim()
      );
      await loadUsers();
      setSuccess("User role updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update user role."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    clearMessages();

    if (!userId) {
      setError("Unable to delete user without an ID.");
      return;
    }

    setLoading(true);

    try {
      await deleteAdminUser(userId);
      await loadUsers();
      setSuccess("User deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete user."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    clearMessages();

    if (!notification.trim()) {
      setError("Please enter a notification.");
      return;
    }

    setLoading(true);

    try {
      await sendAdminNotification(
        notification.trim()
      );
      setNotification("");
      setSuccess("Notification sent successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send notification."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    return (
      <>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </>
    );
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <>
            <h1>Dashboard</h1>
            {renderStatus()}

            <div className="cards">
              <div className="card">
                <h2>
                  {getValue(
                    dashboard?.totalStudents,
                    dashboard?.students,
                    0
                  )}
                </h2>
                <p>Students</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    dashboard?.totalClubs,
                    dashboard?.clubs,
                    0
                  )}
                </h2>
                <p>Clubs</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    dashboard?.totalEvents,
                    dashboard?.events,
                    0
                  )}
                </h2>
                <p>Events</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    dashboard?.totalClubAdmins,
                    dashboard?.clubAdmins,
                    0
                  )}
                </h2>
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
            {renderStatus()}

            {!loading && clubs.length === 0 && (
              <div className="itemCard">
                <p>No clubs found.</p>
              </div>
            )}

            {clubs.map((club) => {
              const clubId = getValue(
                club.id,
                club.clubId
              );
              const isEditing =
                editingClubId === clubId;

              return (
                <div
                  className="itemCard"
                  key={clubId || club.name}
                >
                  {isEditing ? (
                    <form
                      className="club-edit-form"
                      onSubmit={handleUpdateClub}
                    >
                      <input
                        type="text"
                        name="name"
                        value={editClub.name}
                        onChange={handleEditClubChange}
                        placeholder="Club name"
                        required
                      />

                      <input
                        type="text"
                        name="faculty"
                        value={editClub.faculty}
                        onChange={handleEditClubChange}
                        placeholder="Faculty coordinator"
                        required
                      />

                      <input
                        type="email"
                        name="clubAdminEmail"
                        value={editClub.clubAdminEmail}
                        onChange={handleEditClubChange}
                        placeholder="Club admin email"
                        required
                      />

                      <div className="club-actions">
                        <button
                          className="sendBtn"
                          type="submit"
                          disabled={loading}
                        >
                          Save
                        </button>
                        <button
                          className="sendBtn secondaryBtn"
                          type="button"
                          onClick={handleCancelEditClub}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h3>
                        {getValue(
                          club.name,
                          club.clubName,
                          "Unnamed Club"
                        )}
                      </h3>
                      <p>
                        Club Admin :{" "}
                        {getValue(
                          club.adminName,
                          club.clubAdminName,
                          club.admin?.name,
                          "Not assigned"
                        )}
                      </p>

                      <button
                        className="sendBtn"
                        onClick={() =>
                          handleStartEditClub(club)
                        }
                        disabled={!clubId}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="sendBtn"
                        onClick={() =>
                          handleDeleteClub(clubId)
                        }
                        disabled={!clubId}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </>
        );

      case "Manage Events":
        return (
          <>
            <h1>Manage Events</h1>
            {renderStatus()}

            {!loading && !error && events.length === 0 && (
              <div className="itemCard">
                <p>No events found.</p>
              </div>
            )}

            {events.map((event) => {
              const eventId = getValue(
                event.id,
                event.eventId
              );
              const eventName = getValue(
                event.eventName,
                event.title,
                event.name,
                "Untitled Event"
              );
              const clubName = getValue(
                event.clubName,
                event.club?.name,
                event.club?.clubName,
                event.organizer,
                "Not assigned"
              );
              const eventDate = getValue(
                event.eventDate,
                event.date,
                event.startDate,
                "Date not set"
              );
              const status = getValue(
                event.approvalStatus,
                event.status,
                "Pending Approval"
              );

              return (
                <div
                  className="itemCard"
                  key={
                    eventId ||
                    eventName
                  }
                >
                  <h3>{eventName}</h3>
                  <p>Club Name : {clubName}</p>
                  <p>Event Date : {eventDate}</p>
                  <p>Status : {status}</p>

                  <button
                    className="sendBtn"
                    onClick={() =>
                      handleApproveEvent(eventId)
                    }
                    disabled={!eventId || loading}
                  >
                    Approve
                  </button>{" "}
                  <button
                    className="sendBtn"
                    onClick={() =>
                      handleRejectEvent(eventId)
                    }
                    disabled={!eventId || loading}
                  >
                    Reject
                  </button>{" "}
                  <button
                    className="sendBtn"
                    onClick={() =>
                      handleDeleteEvent(eventId)
                    }
                    disabled={!eventId || loading}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </>
        );

      case "Users":
        return (
          <>
            <h1>Users</h1>
            {renderStatus()}

            {!loading && users.length === 0 && (
              <div className="itemCard">
                <p>No users found.</p>
              </div>
            )}

            {users.map((user) => {
              const userId = getValue(
                user.id,
                user.userId
              );
              const roles = Array.isArray(user.roles)
                ? user.roles.join(", ")
                : getValue(user.roles, user.role, "USER");
              const name = getValue(
                user.name,
                user.fullName,
                user.username,
                "Unnamed User"
              );
              const email = getValue(
                user.email,
                "No email"
              );

              return (
                <div
                  className="itemCard"
                  key={getValue(userId, user.email)}
                >
                  <h3>{name}</h3>
                  <p>Email : {email}</p>
                  <p>Role : {roles}</p>

                  <button
                    className="sendBtn"
                    onClick={() =>
                      handleChangeUserRole(user)
                    }
                    disabled={!userId || loading}
                  >
                    Change Role
                  </button>{" "}
                  <button
                    className="sendBtn"
                    onClick={() =>
                      handleDeleteUser(userId)
                    }
                    disabled={!userId || loading}
                  >
                    Delete User
                  </button>
                </div>
              );
            })}
          </>
        );

      case "Notifications":
        return (
          <>
            <h1>Notifications</h1>
            {renderStatus()}

            <textarea
              className="textarea"
              placeholder="Enter announcement..."
              value={notification}
              onChange={(event) =>
                setNotification(event.target.value)
              }
            />

            <button
              className="sendBtn"
              onClick={handleSendNotification}
              disabled={loading}
            >
              Send Notification
            </button>
          </>
        );

      case "Analytics":
        return (
          <>
            <h1>Analytics</h1>
            {renderStatus()}

            <div className="cards">
              <div className="card">
                <h2>
                  {getValue(
                    analytics?.totalStudents,
                    analytics?.students,
                    0
                  )}
                </h2>
                <p>Total Students</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    analytics?.totalClubs,
                    analytics?.clubs,
                    0
                  )}
                </h2>
                <p>Total Clubs</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    analytics?.totalEvents,
                    analytics?.events,
                    0
                  )}
                </h2>
                <p>Total Events</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    analytics?.totalClubAdmins,
                    analytics?.clubAdmins,
                    0
                  )}
                </h2>
                <p>Total Club Admins</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    analytics?.approvedEvents,
                    analytics?.approvedEventCount,
                    0
                  )}
                </h2>
                <p>Approved Events</p>
              </div>

              <div className="card">
                <h2>
                  {getValue(
                    analytics?.pendingEvents,
                    analytics?.pendingEventCount,
                    0
                  )}
                </h2>
                <p>Pending Events</p>
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
            "Settings",
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
