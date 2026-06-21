import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User
export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

export const sendOtp = (email) => {
  return API.post("/auth/send-otp", { email });
};

export const verifyOtp = (email, otp) => {
  return API.post("/auth/verify-otp", {
    email,
    otp
  });
};

// Login User
export const loginUser = (loginData) => {
  return API.post("/auth/login", loginData);
};

export const changePassword = (
  email,
  currentPassword,
  newPassword
) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {}
  };

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return API.post(
    "/users/change-password",
    {
      email,
      oldPassword: currentPassword,
      newPassword
    },
    config
  );
};

export const getHelp = () => {
  return API.get("/help");
};

// Events
export const getAllEvents = () => {
  return API.get("/events");
};

export const getEventById = (id) => {
  return API.get(`/events/${id}`);
};

// Clubs
export const getAllClubs = () => {
  return API.get("/clubs");
};

export const getClubById = (id) => {
  return API.get(`/clubs/${id}`);
};

// Join Club
export const joinClub = (data) => {
  return API.post("/memberships", data);
};
export const updateClub = (id, clubData) => {
  return API.put(`/clubs/${id}`, clubData);
};

export const getUserClubs = (userId) => {
  return API.get(`/memberships/user/${userId}`);
};
export const getClubByAdminEmail = (email) => {
  return API.get(`/clubs/admin?email=${email}`);
};

// Recruitments
export const getAllRecruitments = () => {
  return API.get("/recruitments");
};

export const createRecruitment = (
  recruitmentData
) => {
  return API.post(
    "/recruitments",
    recruitmentData
  );
};

export const getRecruitments = () => {
  return API.get("/recruitments");
};

export const deleteRecruitment = (id) => {
  return API.delete(
    `/recruitments/${id}`
  );
};

// Applications
export const getAllApplications = () => {
  return API.get("/applications");
};

export const approveApplication = (id) => {
  return API.post(
    `/applications/${id}/approve`
  );
};

export const rejectApplication = (id) => {
  return API.post(
    `/applications/${id}/reject`
  );
};

export const submitApplication = (data) => {
  return API.post("/applications", data);
};

// Create Event
export const createEvent = (eventData) => {
  return API.post("/events", eventData);
};

// Create Club
export const createClub = (clubData) => {
  return API.post(
    "/admin/create-club",
    clubData
  );
};

// Announcements
export const createAnnouncement = (data) =>
  API.post("/announcements", data);

export const getAnnouncements = () =>
  API.get("/announcements");

export const deleteAnnouncement = (id) =>
  API.delete(`/announcements/${id}`);
export const getAllAnnouncements = () =>
  API.get("/announcements");
// Club Admin APIs

export const getRecruitmentsByClubId = (
  clubId
) => {
  return API.get(
    `/recruitments/club/${clubId}`
  );
};

export const getApplicationsByClubId = (
  clubId
) => {
  return API.get(
    `/applications/club/${clubId}`
  );
};

export const getAnnouncementsByClubId = (
  clubId
) => {
  return API.get(
    `/announcements/club/${clubId}`
  );
};

export const getEventsByClubId = (
  clubId
) => {
  return API.get(
    `/events/club/${clubId}`
  );
};
export default API;