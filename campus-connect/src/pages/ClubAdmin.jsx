import { useState, useEffect } from "react";
import "./ClubAdmin.css";
import {
  createEvent,
  createRecruitment,
  getRecruitments,
  deleteRecruitment,
  getAllApplications,
  approveApplication,
  rejectApplication
} from "../services/api";

function ClubAdmin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [recruitments, setRecruitments] = useState([]);
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    venue: "",
    eventDate: "",
    organizer: "Coding Club",
    imageUrl: "",
    status: "ACTIVE",
  });
const [applications, setApplications] = useState([]);
const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [recruitmentData, setRecruitmentData] = useState({
    clubId: 1,
    clubName: "Coding Club",
    role: "",
    category: "",
    description: "",
    deadline: "",
    team: "",
    status: "Open",
  });

  const handleEventChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecruitmentChange = (e) => {
    setRecruitmentData({
      ...recruitmentData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRecruitments = async () => {
    try {
      const response = await getRecruitments();
      setRecruitments(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      setApplications(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  const handleApprove = async (id) => {
  try {
    await approveApplication(id);
    fetchApplications();
  } catch (error) {
    console.error(error);
  }
};

const handleReject = async (id) => {
  try {
    await rejectApplication(id);
    fetchApplications();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchRecruitments();
    fetchApplications();
  }, []);

  const handlePostRecruitment = async () => {
    try {
      await createRecruitment(recruitmentData);
      alert("Recruitment Posted Successfully");
      fetchRecruitments();
      setRecruitmentData({
        clubId: 1,
        clubName: "Coding Club",
        role: "",
        category: "",
        description: "",
        deadline: "",
        team: "",
        status: "Open",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to post recruitment");
    }
  };

  const handlePublishEvent = async () => {
    try {
      const response = await createEvent(eventData);

      try {
        const created = response.data;
        localStorage.setItem("newEvent", JSON.stringify(created));
        window.dispatchEvent(new CustomEvent("newEvent", { detail: created }));
      } catch (e) {
        console.warn("localStorage setItem failed", e);
      }

      alert("Event Created Successfully");
      setEventData({
        eventName: "",
        description: "",
        venue: "",
        eventDate: "",
        organizer: "Coding Club",
        imageUrl: "",
        status: "ACTIVE",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create event");
    }
  };

  const handleDeleteRecruitment = async (id) => {
    if (!id) {
      alert("Unable to delete this recruitment. Missing recruitment id.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this recruitment?");
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteRecruitment(id);
      await fetchRecruitments();
      alert("Recruitment deleted successfully.");
    } catch (error) {
      console.error("Delete recruitment failed", error);
      alert(
        error?.message ||
          error?.response?.data?.message ||
          "Failed to delete recruitment."
      );
    }
  };

  return (
    <div className="admin-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Club Admin</h2>

        <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveSection("events")}>Create Event</button>
        <button onClick={() => setActiveSection("recruitments")}>Recruitments</button>
        <button onClick={() => setActiveSection("applications")}>Applications</button>
        <button onClick={() => setActiveSection("announcements")}>Announcements</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <div>
            <h1>Coding Club Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h2>150+</h2>
                <p>Members</p>
              </div>
              <div className="stat-card">
                <h2>12</h2>
                <p>Events</p>
              </div>
              <div className="stat-card">
                <h2>35</h2>
                <p>Applications</p>
              </div>
              <div className="stat-card">
                <h2>5</h2>
                <p>Recruitments</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "events" && (
          <div className="form-section">
            <h1>Create Event</h1>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={eventData.eventName}
              onChange={handleEventChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={eventData.description}
              onChange={handleEventChange}
            />
            <input
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleEventChange}
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue"
              value={eventData.venue}
              onChange={handleEventChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={eventData.imageUrl}
              onChange={handleEventChange}
            />
            <input
              type="text"
              name="organizer"
              placeholder="Organizer (e.g., Coding Club)"
              value={eventData.organizer}
              onChange={handleEventChange}
            />
            <select name="status" value={eventData.status} onChange={handleEventChange}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <button onClick={handlePublishEvent}>Publish Event</button>
          </div>
        )}

        {activeSection === "recruitments" && (
          <div className="form-section">
            <h1>Create Recruitment</h1>
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={recruitmentData.role}
              onChange={handleRecruitmentChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={recruitmentData.category}
              onChange={handleRecruitmentChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={recruitmentData.description}
              onChange={handleRecruitmentChange}
            />
            <input
              type="date"
              name="deadline"
              value={recruitmentData.deadline}
              onChange={handleRecruitmentChange}
            />
            <input
              type="text"
              name="team"
              placeholder="Team"
              value={recruitmentData.team}
              onChange={handleRecruitmentChange}
            />
            <select name="status" value={recruitmentData.status} onChange={handleRecruitmentChange}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
            <button onClick={handlePostRecruitment}>Post Recruitment</button>
            <hr />
            <h2>Recruitment Posts</h2>
            {recruitments.map((rec) => {
              const recruitmentId = rec._id ?? rec.id ?? rec.recruitmentId;
              return (
                <div key={recruitmentId} className="application-card">
                  <h3>{rec.role}</h3>
                  <p>
                    <strong>Category:</strong> {rec.category}
                  </p>
                  <p>
                    <strong>Team:</strong> {rec.team}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {rec.deadline}
                  </p>
                  <p>
                    <strong>Status:</strong> {rec.status}
                  </p>
                  <button
                    className="reject"
                    onClick={() => handleDeleteRecruitment(recruitmentId)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
       {activeSection === "applications" && (
  <div>
    <h1>Student Applications</h1>

    {applications.length === 0 ? (
      <p>No applications found.</p>
    ) : (
      applications.map((app) => (
        <div
          key={app.id}
          className="application-card"
        >
          <h2>{app.studentName}</h2>

          <p>
            <strong>Email:</strong> {app.email}
          </p>

          <p>
            <strong>Status:</strong> {app.status}
          </p>

          {selectedApplicant === app.id && (
            <div className="details-box">

              <p>
                <strong>Department:</strong>{" "}
                {app.department}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {app.year}
              </p>

              <p>
                <strong>Recruitment ID:</strong>{" "}
                {app.recruitmentId}
              </p>

              <p>
                <strong>Reason:</strong>{" "}
                {app.reason}
              </p>

            </div>
          )}

          <div className="application-buttons">

            {app.status === "PENDING" && (
              <>
                <button
                  className="approve"
                  onClick={() => handleApprove(app.id)}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => handleReject(app.id)}
                >
                  Reject
                </button>
              </>
            )}

            <button
              className="details-btn"
              onClick={() =>
                setSelectedApplicant(
                  selectedApplicant === app.id
                    ? null
                    : app.id
                )
              }
            >
              {selectedApplicant === app.id
                ? "Hide Details"
                : "View Details"}
            </button>

          </div>
        </div>
      ))
    )}
  </div>
)}
      </main>
    </div>
  );
}

export default ClubAdmin;
