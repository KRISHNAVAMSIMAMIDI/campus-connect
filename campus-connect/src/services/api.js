import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Register User
export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

// Login User
export const loginUser = (loginData) => {
  return API.post("/auth/login", loginData);
};

export default API;