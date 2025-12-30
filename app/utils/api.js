import axios from "axios";

const api = axios.create({
  baseURL: "https://fahim.appdevs.team/stripcard/public/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
  },
});

// Interceptor to automatically add Bearer token from localStorage
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  try {
    const { data } = await api.post("/user/login", credentials);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post("/user/register", userData);
    return data;
  } catch (error) {
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

export const forgotPassword = async (email) => {
  const formData = new FormData();
  formData.append("email", email);
  try {
    const { data } = await api.post("/user/forget/password", formData);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const verifyOtp = async (otp) => {
  const formData = new FormData();
  formData.append("code", otp);
  try {
    const { data } = await api.post("/user/forget/verify/code", formData);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const resetPassword = async ({
  code,
  password,
  password_confirmation,
}) => {
  const formData = new FormData();
  formData.append("code", code);
  formData.append("password", password);
  formData.append("password_confirmation", password_confirmation);

  try {
    const { data } = await api.post("/user/forget/reset/password", formData);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const verifyEmail = async (code) => {
  const formData = new FormData();
  formData.append("code", code);
  try {
    const { data } = await api.post("/user/email-verify", formData);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const resendEmailVerifyCode = async () => {
  try {
    const { data } = await api.post("/user/send-code");
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};


