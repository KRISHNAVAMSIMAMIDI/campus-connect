import { useState, useEffect } from "react";
import "./ClubAdmin.css";
import {
  createEvent,
  createRecruitment,
  getRecruitments,
  deleteRecruitment,

  getAllApplications,
  approveApplication,
  rejectApplication,

  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  getAllAnnouncements,

  getAllEvents,

  getClubById,
  getClubByAdminEmail,

  getRecruitmentsByClubId,
  getApplicationsByClubId,
  getAnnouncementsByClubId,
  getEventsByClubId,

  updateClub

} from "../services/api";
function ClubAdmin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [recruitments, setRecruitments] = useState([]);
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    venue: "",
    eventDate: "",
    organizer: "",
    imageUrl: "",
    status: "ACTIVE",
  });
  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [recruitmentData, setRecruitmentData] = useState({
    clubId: null,
    clubName: "",
    role: "",
    category: "",
    description: "",
    deadline: "",
    team: "",
    status: "Open",
  });
  const [announcements, setAnnouncements] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    events: 0,
    recruitments: 0,
    applications: 0,
    announcements: 0,
  });

 const [clubData, setClubData] = useState({
  id: null,
  name: "",
  tagline: "",
  description: "",
  about: "",
  vision: "",
  faculty: "",
  members: 0,
  logoUrl: "",
  bannerUrl: "",
  recruitment: "",
  instagramUrl: "",
  linkedinUrl: "",
});

const [announcementData, setAnnouncementData] = useState({
  clubId: null,
  clubName: "",
  title: "",
  message: "",
  date: "",
});
 const [editMode, setEditMode] = useState(false);
const fetchClubProfile = async () => {
  try {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const response =
      await getClubByAdminEmail(
        user.email
      );

    setClubData(
      response.data
    );

  } catch (error) {

    console.error(error);

  }
};

  const handleEventChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };
  const fetchAnnouncements = async () => {
  try {

    if (!clubData.id) return;

    const response =
      await getAnnouncementsByClubId(
        clubData.id
      );

    setAnnouncements(
      response.data
    );

  } catch (error) {

    console.error(error);

  }
};

  const handleRecruitmentChange = (e) => {
    setRecruitmentData({
      ...recruitmentData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRecruitments = async () => {
  try {

    if (!clubData.id) return;

    const response =
      await getRecruitmentsByClubId(
        clubData.id
      );

    setRecruitments(
      response.data
    );

  } catch (error) {

    console.error(error);

  }
};

  const fetchApplications = async () => {
  try {

    if (!clubData.id) return;

    const response =
      await getApplicationsByClubId(
        clubData.id
      );

    setApplications(
      response.data
    );

  } catch (error) {

    console.error(error);

  }
};
  const handlePostAnnouncement = async () => {
  try {
    await createAnnouncement(announcementData);

    alert("Announcement Posted Successfully");

    fetchAnnouncements();

    setAnnouncementData({
      clubId: clubData?.id || null,
      clubName: clubData?.name || "",
      title: "",
      message: "",
      date: "",
    });

  } catch (error) {
    console.error(error);
    alert("Failed to post announcement");
  }
};
const handleDeleteAnnouncement = async (id) => {
  try {
    await deleteAnnouncement(id);

    fetchAnnouncements();

    alert("Announcement Deleted");
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

  const fetchDashboardData = async () => {
    try {
     const eventsRes =
  await getEventsByClubId(
    clubData.id
  );

const recruitmentsRes =
  await getRecruitmentsByClubId(
    clubData.id
  );

const applicationsRes =
  await getApplicationsByClubId(
    clubData.id
  );

const announcementsRes =
  await getAnnouncementsByClubId(
    clubData.id
  );
      setDashboardData({
        events: eventsRes.data.length,
        recruitments: recruitmentsRes.data.length,
        applications: applicationsRes.data.length,
        announcements: announcementsRes.data.length,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

  fetchClubProfile();

}, []);

 useEffect(() => {

  if (!clubData.id) return;

  fetchRecruitments();

  fetchApplications();

  fetchAnnouncements();

  fetchDashboardData();

}, [clubData.id]);
  const handleClubChange = (e) => {
  setClubData({
    ...clubData,
    [e.target.name]: e.target.value,
  });
  };
  const handleUpdateClub = async () => {
  try {

    await updateClub(
      clubData.id,
      clubData
    );

    alert("Club Updated Successfully");

  } catch (error) {

    console.error(error);

    alert("Update Failed");
  }
};
  const handlePostRecruitment = async () => {
    try {
      await createRecruitment(recruitmentData);
      alert("Recruitment Posted Successfully");
      fetchRecruitments();
      setRecruitmentData({
        clubId: clubData?.id || null,
        clubName: clubData?.name || "",
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
        organizer: clubData?.name || "",
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
        <button onClick={() => setActiveSection("clubProfile")}>
  Club Profile
</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* DASHBOARD */}
       {activeSection === "dashboard" && (
  <div>

    <h1>{clubData.name} Dashboard</h1>

    <div className="stats-grid">

      <div className="stat-card">
        <h2>{dashboardData.events}</h2>
        <p>Total Events</p>
      </div>

      <div className="stat-card">
        <h2>{dashboardData.recruitments}</h2>
        <p>Recruitments</p>
      </div>

      <div className="stat-card">
        <h2>{dashboardData.applications}</h2>
        <p>Applications</p>
      </div>

      <div className="stat-card">
        <h2>{dashboardData.announcements}</h2>
        <p>Announcements</p>
      </div>
      <div className="recent-section">

  <h2>Recent Recruitments</h2>

  {recruitments.slice(0, 3).map((rec) => (
    <div key={rec.id}>
      <strong>{rec.role}</strong>
      <p>{rec.team}</p>
    </div>
  ))}

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
{activeSection === "announcements" && (
  <div className="form-section">

    <h1>Post Announcement</h1>

    <input
      type="text"
      placeholder="Title"
      value={announcementData.title}
      onChange={(e) =>
        setAnnouncementData({
          ...announcementData,
          title: e.target.value,
        })
      }
    />

    <textarea
      placeholder="Announcement Message"
      value={announcementData.message}
      onChange={(e) =>
        setAnnouncementData({
          ...announcementData,
          message: e.target.value,
        })
      }
    />

    <input
      type="date"
      value={announcementData.date}
      onChange={(e) =>
        setAnnouncementData({
          ...announcementData,
          date: e.target.value,
        })
      }
    />

    <button onClick={handlePostAnnouncement}>
      Post Announcement
    </button>

    <hr />

    <h2>All Announcements</h2>

    {announcements.map((announcement) => (

      <div
        key={announcement.id}
        className="application-card"
      >

        <h3>{announcement.title}</h3>

        <p>{announcement.message}</p>

        <p>
          <strong>Date:</strong>
          {" "}
          {announcement.date}
        </p>

        <button
          className="reject"
          onClick={() =>
            handleDeleteAnnouncement(
              announcement.id
            )
          }
        >
          Delete
        </button>

      </div>

    ))}

  </div>

)}
{activeSection === "clubProfile" && (

<div className="club-profile-admin">

  <img
    src={clubData.bannerUrl}
    alt="Banner"
    className="admin-banner"
  />

  <div className="admin-header">

    <img
      src={clubData.logoUrl}
      alt="Logo"
      className="admin-logo"
    />

    <div className="club-info">

  <h1 className="club-title">
    {clubData.name}
  </h1>

  <p className="club-tagline">
    {clubData.tagline}
  </p>

</div>

  </div>

  {!editMode && (

    <>
      <h3>About</h3>
      <p>{clubData.about}</p>

      <h3>Vision</h3>
      <p>{clubData.vision}</p>

      <h3>Description</h3>
      <p>{clubData.description}</p>

      <h3>Faculty Coordinator</h3>
      <p>{clubData.faculty}</p>

      <h3>Members</h3>
      <p>{clubData.members}</p>

      <button
        onClick={() =>
          setEditMode(true)
        }
      >
        Edit Profile
      </button>
    </>

  )}

  {editMode && (

    <div className="edit-form">

      <input
        name="name"
        value={clubData.name}
        onChange={handleClubChange}
      />

      <input
        name="tagline"
        value={clubData.tagline}
        onChange={handleClubChange}
      />

      <textarea
        name="about"
        value={clubData.about}
        onChange={handleClubChange}
      />

      <textarea
        name="vision"
        value={clubData.vision}
        onChange={handleClubChange}
      />

      <textarea
        name="description"
        value={clubData.description}
        onChange={handleClubChange}
      />

      <input
        name="faculty"
        value={clubData.faculty}
        onChange={handleClubChange}
      />

      <input
        name="members"
        value={clubData.members}
        onChange={handleClubChange}
      />

      <input
        name="logoUrl"
        value={clubData.logoUrl}
        onChange={handleClubChange}
      />

      <input
        name="bannerUrl"
        value={clubData.bannerUrl}
        onChange={handleClubChange}
      />

      <input
        name="instagramUrl"
        value={clubData.instagramUrl}
        onChange={handleClubChange}
      />

      <input
        name="linkedinUrl"
        value={clubData.linkedinUrl}
        onChange={handleClubChange}
      />

      <button
        onClick={async () => {

          await handleUpdateClub();

          setEditMode(false);

        }}
      >
        Save Changes
      </button>

    </div>

  )}

</div>

)}
      </main>
    </div>
  );
}

export default ClubAdmin;
