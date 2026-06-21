import { useState, useEffect, useCallback } from "react";
import "./ClubAdmin.css";
import {
  createEvent,
  createRecruitment,
  deleteRecruitment,
  getAllRecruitments,

  getAllApplications,
  approveApplication,
  rejectApplication,

  createAnnouncement,
  deleteAnnouncement,
  getClubByAdminEmail,
  getAllEvents,

  getRecruitmentsByClubId,
  getApplicationsByClubId,
  getAnnouncementsByClubId,
  getEventsByClubId,

  updateClub

} from "../services/api";

const getRecordId = (record) => (
  record?.id ??
  record?._id ??
  record?.eventId ??
  record?.event_id ??
  record?.clubId ??
  record?.club_id ??
  null
);

const getClubId = (club) => (
  club?.id ??
  club?._id ??
  club?.clubId ??
  club?.club_id ??
  null
);

const getEventClubId = (event) => (
  event?.clubId ??
  event?.club_id ??
  event?.club?.id ??
  event?.club?._id ??
  null
);

const getEventClubName = (event) => (
  event?.clubName ??
  event?.club_name ??
  event?.club?.name ??
  event?.club?.clubName ??
  event?.organizer ??
  ""
);

const getRecruitmentClubId = (recruitment) => (
  recruitment?.clubId ??
  recruitment?.club_id ??
  recruitment?.club?.id ??
  recruitment?.club?._id ??
  null
);

const getRecruitmentClubName = (recruitment) => (
  recruitment?.clubName ??
  recruitment?.club_name ??
  recruitment?.club?.name ??
  recruitment?.club?.clubName ??
  ""
);

const getApplicationClubId = (application) => (
  application?.clubId ??
  application?.club_id ??
  application?.club?.id ??
  application?.club?._id ??
  null
);

const getApplicationClubName = (application) => (
  application?.clubName ??
  application?.club_name ??
  application?.club?.name ??
  application?.club?.clubName ??
  ""
);

const getApplicationRecruitmentId = (application) => (
  application?.recruitmentId ??
  application?.recruitment_id ??
  application?.recruitment?.id ??
  application?.recruitment?._id ??
  null
);

const normalizeArray = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (payload.data) return normalizeArray(payload.data);
  if (payload.items) return normalizeArray(payload.items);
  if (payload.applications) return normalizeArray(payload.applications);
  if (payload.recruitments) return normalizeArray(payload.recruitments);
  if (payload.events) return normalizeArray(payload.events);
  if (payload.announcements) return normalizeArray(payload.announcements);
  return [];
};

const mergeRecordsById = (...groups) => {
  const seen = new Set();
  const merged = [];

  groups.flat().forEach((record) => {
    const id = getRecordId(record);
    const key = id ? String(id) : JSON.stringify(record);

    if (seen.has(key)) return;
    seen.add(key);
    merged.push(record);
  });

  return merged;
};

const isSameClubEvent = (event, club) => {
  const clubId = getClubId(club);
  const eventClubId = getEventClubId(event);
  const clubName = (club?.name || "").trim().toLowerCase();
  const eventClubName = getEventClubName(event).trim().toLowerCase();

  return (
    (clubId && eventClubId && String(eventClubId) === String(clubId)) ||
    (clubName && eventClubName && eventClubName === clubName)
  );
};

const isSameClubRecruitment = (recruitment, club) => {
  const clubId = getClubId(club);
  const recruitmentClubId = getRecruitmentClubId(recruitment);
  const clubName = (club?.name || "").trim().toLowerCase();
  const recruitmentClubName = getRecruitmentClubName(recruitment)
    .trim()
    .toLowerCase();

  return (
    (clubId && recruitmentClubId && String(recruitmentClubId) === String(clubId)) ||
    (clubName && recruitmentClubName && recruitmentClubName === clubName)
  );
};

const isSameClubApplication = (application, club, recruitmentIds) => {
  const clubId = getClubId(club);
  const applicationClubId = getApplicationClubId(application);
  const clubName = (club?.name || "").trim().toLowerCase();
  const applicationClubName = getApplicationClubName(application)
    .trim()
    .toLowerCase();
  const recruitmentId = getApplicationRecruitmentId(application);

  return (
    (clubId && applicationClubId && String(applicationClubId) === String(clubId)) ||
    (clubName && applicationClubName && applicationClubName === clubName) ||
    recruitmentIds.has(String(recruitmentId))
  );
};

const getStoredClubApplications = (clubId) => {
  try {
    return normalizeArray(
      JSON.parse(localStorage.getItem(`clubApplications:${clubId}`))
    );
  } catch {
    return [];
  }
};

const getStoredClubEvents = (clubId) => {
  try {
    return normalizeArray(
      JSON.parse(localStorage.getItem(`clubEvents:${clubId}`))
    );
  } catch {
    return [];
  }
};

const setStoredClubEvents = (clubId, nextEvents) => {
  try {
    localStorage.setItem(
      `clubEvents:${clubId}`,
      JSON.stringify(nextEvents)
    );
  } catch (error) {
    console.warn("Unable to store club events locally", error);
  }
};

function ClubAdmin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [recruitments, setRecruitments] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
  eventName: "",
  description: "",
  venue: "",
  eventDate: "",
  organizer: "",
  imageUrl: "",
  status: "ACTIVE",
  clubId: null,
  clubName: "",
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

  const handleEventChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };


  const fetchRecruitments = useCallback(async () => {
    try {

      const clubId = getClubId(clubData);
      if (!clubId) return;

      const response =
        await getRecruitmentsByClubId(
          clubId
        );

      let clubRecruitments = normalizeArray(response.data);

      if (clubRecruitments.length === 0) {
        const allRecruitmentsRes = await getAllRecruitments();
        clubRecruitments = normalizeArray(allRecruitmentsRes.data)
          .filter((recruitment) =>
            isSameClubRecruitment(recruitment, clubData)
          );
      }

      setRecruitments(clubRecruitments);

    } catch (error) {

      console.error(error);

    }
  }, [clubData]);

  const fetchApplications = useCallback(async () => {
    try {

      const clubId = getClubId(clubData);
      if (!clubId) return;

      const response =
        await getApplicationsByClubId(
          clubId
        );

      const clubApplications = mergeRecordsById(
        normalizeArray(response.data),
        getStoredClubApplications(clubId)
      );

      if (clubApplications.length > 0) {
        setApplications(clubApplications);
        return;
      }

      const [allApplicationsRes, clubRecruitmentsRes] =
        await Promise.all([
          getAllApplications(),
          getRecruitmentsByClubId(clubId),
        ]);

      let clubRecruitments = normalizeArray(clubRecruitmentsRes.data);

      if (clubRecruitments.length === 0) {
        const allRecruitmentsRes = await getAllRecruitments();
        clubRecruitments = normalizeArray(allRecruitmentsRes.data)
          .filter((recruitment) =>
            isSameClubRecruitment(recruitment, clubData)
          );
      }

      const recruitmentIds = new Set(
        clubRecruitments
          .map((recruitment) => String(getRecordId(recruitment)))
          .filter(Boolean)
      );

      const filteredApplications = mergeRecordsById(
        normalizeArray(allApplicationsRes.data)
          .filter((application) =>
            isSameClubApplication(application, clubData, recruitmentIds)
          ),
        getStoredClubApplications(clubId)
      );

      setApplications(filteredApplications);

    } catch (error) {

      console.error(error);

    }
  }, [clubData]);

  const fetchAnnouncements = useCallback(async () => {
    try {

      const clubId = getClubId(clubData);
      if (!clubId) return;

      const response = await getAnnouncementsByClubId(clubId);

      setAnnouncements(normalizeArray(response.data));
    } catch (error) {
      console.error(error);
    }
  }, [clubData]);

  const fetchEvents = useCallback(async () => {
    try {

      const clubId = getClubId(clubData);
      if (!clubId) return;

      const response = await getEventsByClubId(clubId);
      let clubEvents = normalizeArray(response.data);

      if (clubEvents.length === 0) {
        const allEventsRes = await getAllEvents();
        clubEvents = normalizeArray(allEventsRes.data)
          .filter((event) => isSameClubEvent(event, clubData));
      }

      setEvents(
        mergeRecordsById(
          clubEvents,
          getStoredClubEvents(clubId)
        )
      );
    } catch (error) {
      console.error(error);
    }
  }, [clubData]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const clubId = getClubId(clubData);
      if (!clubId) return;

      const eventsRes =
        await getEventsByClubId(
          clubId
        );

      const recruitmentsRes =
        await getRecruitmentsByClubId(
          clubId
        );

      const applicationsRes =
        await getApplicationsByClubId(
          clubId
        );

      const announcementsRes =
        await getAnnouncementsByClubId(
          clubId
        );

      let clubEvents = normalizeArray(eventsRes.data);
      const clubRecruitments = normalizeArray(recruitmentsRes.data);
      const clubAnnouncements = normalizeArray(announcementsRes.data);
      let clubApplications = mergeRecordsById(
        normalizeArray(applicationsRes.data),
        getStoredClubApplications(clubId)
      );

      if (clubEvents.length === 0) {
        const allEventsRes = await getAllEvents();
        clubEvents = normalizeArray(allEventsRes.data)
          .filter((event) => isSameClubEvent(event, clubData));
      }

      clubEvents = mergeRecordsById(
        clubEvents,
        getStoredClubEvents(clubId)
      );

      let resolvedClubRecruitments = clubRecruitments;

      if (resolvedClubRecruitments.length === 0) {
        const allRecruitmentsRes = await getAllRecruitments();
        resolvedClubRecruitments = normalizeArray(allRecruitmentsRes.data)
          .filter((recruitment) =>
            isSameClubRecruitment(recruitment, clubData)
          );
      }

      if (clubApplications.length === 0) {
        const allApplicationsRes = await getAllApplications();
        const recruitmentIds = new Set(
          resolvedClubRecruitments
            .map((recruitment) => String(getRecordId(recruitment)))
            .filter(Boolean)
        );

        clubApplications = mergeRecordsById(
          normalizeArray(allApplicationsRes.data)
            .filter((application) =>
              isSameClubApplication(application, clubData, recruitmentIds)
            ),
          getStoredClubApplications(clubId)
        );
      }

      setDashboardData({
        events: clubEvents.length,
        recruitments: resolvedClubRecruitments.length,
        applications: clubApplications.length,
        announcements: clubAnnouncements.length,
      });
    } catch (error) {
      console.error(error);
    }
  }, [clubData]);

  useEffect(() => {
    let ignore = false;

    const fetchClubProfile = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (!user?.email) return;

        const response =
          await getClubByAdminEmail(
            user.email
          );

        if (ignore) return;

        const club = response.data;
        const clubId = getClubId(club);

        setClubData(club);

        setRecruitmentData(prev => ({
          ...prev,
          clubId,
          clubName: club.name,
        }));

        setAnnouncementData(prev => ({
          ...prev,
          clubId,
          clubName: club.name,
        }));

        setEventData(prev => ({
          ...prev,
          clubId,
          clubName: club.name,
          organizer: club.name,
        }));

      } catch (error) {
        console.error(error);
      }
    };

    fetchClubProfile();

    return () => {
      ignore = true;
    };
  }, []);
  const refreshClubAdminData = useCallback(async () => {
    if (!getClubId(clubData)) return;

    await fetchRecruitments();
    await fetchApplications();
    await fetchAnnouncements();
    await fetchEvents();
    await fetchDashboardData();
  }, [
    clubData,
    fetchRecruitments,
    fetchApplications,
    fetchAnnouncements,
    fetchEvents,
    fetchDashboardData,
  ]);

  useEffect(() => {
    if (!getClubId(clubData)) return;

    const load = async () => {
      await fetchRecruitments();
      await fetchApplications();
      await fetchAnnouncements();
      await fetchEvents();
      await fetchDashboardData();
    };

    load();
  }, [
    clubData,
    fetchRecruitments,
    fetchApplications,
    fetchAnnouncements,
    fetchEvents,
    fetchDashboardData,
  ]);

  const handleRecruitmentChange = (e) => {
    setRecruitmentData({
      ...recruitmentData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostAnnouncement = async () => {
  try {
    const clubId = getClubId(clubData);

    await createAnnouncement({
      ...announcementData,
      clubId,
      clubName: clubData.name,
    });

    alert("Announcement Posted Successfully");

    await fetchAnnouncements();
    await fetchDashboardData();

    setAnnouncementData({
      clubId,
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

    await fetchAnnouncements();
    await fetchDashboardData();

    alert("Announcement Deleted");
  } catch (error) {
    console.error(error);
  }
 };
  const handleApprove = async (id) => {
  try {
    await approveApplication(id);
    await fetchApplications();
    await fetchDashboardData();
  } catch (error) {
    console.error(error);
  }
};

const handleReject = async (id) => {
  try {
    await rejectApplication(id);
    await fetchApplications();
    await fetchDashboardData();
  } catch (error) {
    console.error(error);
  }
};

  const handleClubChange = (e) => {
  setClubData({
    ...clubData,
    [e.target.name]: e.target.value,
  });
  };
  const handleUpdateClub = async () => {
  try {

    await updateClub(
      getClubId(clubData),
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
      const clubId = getClubId(clubData);

      await createRecruitment({
        ...recruitmentData,
        clubId,
        clubName: clubData.name,
      });
      alert("Recruitment Posted Successfully");
      await fetchRecruitments();
      await fetchDashboardData();
      setRecruitmentData({
        clubId,
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
      const clubId = getClubId(clubData);

      const eventPayload = {
        ...eventData,
        clubId,
        clubName: clubData.name,
        organizer: eventData.organizer || clubData.name,
      };

      const response = await createEvent(eventPayload);
      const created = {
        id:
          response.data?.id ??
          response.data?._id ??
          `local-${Date.now()}`,
        ...eventPayload,
        ...response.data,
      };

      try {
        localStorage.setItem("newEvent", JSON.stringify(created));
        window.dispatchEvent(new CustomEvent("newEvent", { detail: created }));
      } catch (e) {
        console.warn("localStorage setItem failed", e);
      }

      setEvents((prev) => {
        const createdId = getRecordId(created);
        const alreadyExists = prev.some(
          (event) => String(getRecordId(event)) === String(createdId)
        );

        if (alreadyExists) return prev;
        const nextEvents = [created, ...prev];
        setStoredClubEvents(clubId, nextEvents);
        return nextEvents;
      });

      setDashboardData((prev) => ({
        ...prev,
        events: prev.events + 1,
      }));

      alert("Event Created Successfully");
      setEventData({
        eventName: "",
        description: "",
        venue: "",
        eventDate: "",
        organizer: clubData?.name || "",
        imageUrl: "",
        clubId,
        clubName: clubData?.name || "",
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
      await fetchApplications();
      await fetchDashboardData();
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
    <div key={getRecordId(rec)}>
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
            <hr />
            <h2>Club Events</h2>
            {events.length === 0 ? (
              <p>No events created yet.</p>
            ) : (
              events.map((event) => (
                <div
                  key={getRecordId(event)}
                  className="application-card"
                >
                  <h3>{event.eventName}</h3>
                  <p>
                    <strong>Club:</strong>{" "}
                    {event.clubName || event.club?.name || clubData.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {event.eventDate}
                  </p>
                  <p>
                    <strong>Venue:</strong> {event.venue}
                  </p>
                  <p>
                    <strong>Status:</strong> {event.status}
                  </p>
                </div>
              ))
            )}
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
          key={getRecordId(app)}
          className="application-card"
        >
          <h2>{app.studentName}</h2>

          <p>
            <strong>Email:</strong> {app.email}
          </p>

          <p>
            <strong>Status:</strong> {app.status}
          </p>

          {selectedApplicant === getRecordId(app) && (
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
                    : getRecordId(app)
                )
              }
            >
              {selectedApplicant === getRecordId(app)
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
        key={getRecordId(announcement)}
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
