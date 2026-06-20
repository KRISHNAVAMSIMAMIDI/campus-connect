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
    config.headers.Authorization = `Bearer ${token}`;
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
export const getAllClubs = () => {
  return API.get("/clubs");
};

export const getClubById = (id) => {
  return API.get(`/clubs/${id}`);
};
//join club
export const joinClub = (data) => {
  return API.post("/memberships", data);
};

export const getUserClubs = (userId) => {
  return API.get(`/memberships/user/${userId}`);
};
export const getAllRecruitments = () => {
  return API.get("/recruitments");
};

export const submitApplication = (data) => {
  return API.post("/applications", data);
};
// Create Event
export const createEvent = (eventData) => {
  return API.post("/events", eventData);
};
export default API;