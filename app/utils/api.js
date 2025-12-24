import axios from "axios";

const api = axios.create({
  baseURL: "https://fahim.appdevs.team/stripcard/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to automatically add Bearer token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  try {
    const { data } = await api.post("/user/login", credentials);
    return data; // return the whole { message, data } object
  } catch (error) {
    // throw error; // component will handle error display
    console.log("Error", error);
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post("/user/register", userData);
    return data; // Return the whole { message, data } object
  } catch (error) {
    // throw error; // Component will handle error display
    console.log("Error", error);
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await api.get("/user/logout");
    return data;
  } catch (error) {
    console.log(error);
  }
};
