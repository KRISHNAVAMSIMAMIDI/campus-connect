import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
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

export const getUserClubs = (userId) => {
  return API.get(`/memberships/user/${userId}`);
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

// Super Admin
export const getAdminDashboard = () => {
  return API.get("/admin/dashboard");
};

export const getAdminClubs = () => {
  return API.get("/admin/clubs");
};

export const deleteAdminClub = (id) => {
  return API.delete(`/admin/clubs/${id}`);
};

export const updateAdminClub = (id, clubData) => {
  return API.put(`/admin/clubs/${id}`, clubData);
};

export const getAdminEvents = () => {
  return API.get("/admin/events").catch(() =>
    API.get("/events")
  );
};

export const approveAdminEvent = (id) => {
  return API.put(`/admin/events/${id}/approve`);
};

export const rejectAdminEvent = (id) => {
  return API.put(`/admin/events/${id}/reject`);
};

export const deleteAdminEvent = (id) => {
  return API.delete(`/admin/events/${id}`);
};

export const getAdminUsers = () => {
  return API.get("/admin/users");
};

export const updateAdminUserRole = (id, role) => {
  return API.put(`/admin/users/${id}/role`, {
    role
  });
};

export const deleteAdminUser = (id) => {
  return API.delete(`/admin/users/${id}`);
};

export const sendAdminNotification = (message) => {
  return API.post("/admin/notifications", {
    message
  });
};

export const getAdminAnalytics = () => {
  return API.get("/admin/analytics");
};

export default API;
