import axios from "axios";

const api = axios.create({
  // baseURL: "https://fahim.appdevs.team/stripcard/public/api",
  baseURL: "https://mehedi.appdevs.team/stripcard/public/api",
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

export const getUserDashboard = async () => {
  try {
    const { data } = await api.get("/user/dashboard");
    return data;
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get("/user/profile");
    return data;
  } catch (error) {
    // console.error("Profile fetch error:", error);
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const updateUserProfile = async (profileData, imageFile) => {
  const formData = new FormData();

  for (const key in profileData) {
    if (profileData[key] !== null && profileData[key] !== undefined) {
      formData.append(key, profileData[key]);
    }
  }

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const { data } = await api.post("/user/profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const deleteUserAccount = async () => {
  try {
    const { data } = await api.post("/user/delete/account");
    return data;
  } catch (error) {
    console.error("Delete account error:", error);
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const updateUserPassword = async ({
  current_password,
  password,
  password_confirmation,
}) => {
  const formData = new FormData();
  formData.append("current_password", current_password);
  formData.append("password", password);
  formData.append("password_confirmation", password_confirmation);

  try {
    const { data } = await api.post("/user/password/update", formData);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const getKycInputFields = async () => {
  try {
    const { data } = await api.get("/user/kyc/input-fields");
    return data;
  } catch (error) {
    console.error("KYC fetch error:", error);
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["Failed to fetch KYC data"] } };
  }
};

export const submitKyc = async (kycFormValues) => {
  const formData = new FormData();

  // Append dynamic fields
  Object.keys(kycFormValues).forEach((key) => {
    if (kycFormValues[key] !== null && kycFormValues[key] !== undefined) {
      formData.append(key, kycFormValues[key]);
    }
  });

  try {
    const { data } = await api.post("/user/kyc/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    // console.error("KYC submit error:", error);
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["Failed to submit KYC"] } };
  }
};

export const getUserGiftCards = async () => {
  try {
    const { data } = await api.get("/user/gift-card");
    return data;
  } catch (error) {
    if (error.response) {
      return error.response?.data || { message: { error: ["Network error"] } };
    }
  }
};

export const getAllGiftCards = async (page = 2) => {
  try {
    const { data } = await api.get(`/user/gift-card/all?page=${page}`);
    return data;
  } catch (error) {
    console.error("Error fetching gift cards:", error);

    if (error.response?.data) {
      return error.response.data;
    }

    return {
      message: {
        error: ["An unexpected error occurred while fetching gift cards"],
      },
    };
  }
};

export const searchGiftCardsByCountry = async (iso2, page = 1) => {
  try {
    const { data } = await api.get(
      `/user/gift-card/search?country=${iso2.toUpperCase()}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error("Gift cards search error:", error);
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["An unexpected error occurred while searching gift cards"],
      },
    };
  }
};

export const getGiftCardDetails = async (productId) => {
  try {
    const { data } = await api.get(
      `/user/gift-card/details?product_id=${productId}`
    );
    return data;
  } catch (error) {
    // console.error("Gift card details fetch error:", error);
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: [
          "An unexpected error occurred while fetching gift card details",
        ],
      },
    };
  }
};

export const submitGiftCardOrder = async (orderData) => {
  try {
    // Using FormData since many of your other endpoints use it
    const formData = new FormData();

    // Append all fields
    Object.entries(orderData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const { data } = await api.post("/user/gift-card/order", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    // console.error("Gift card order submission error:", error);

    if (error.response?.data) {
      return error.response.data;
    }

    return {
      message: {
        error: [
          "An unexpected error occurred while placing the gift card order",
        ],
      },
    };
  }
};

export const transferMoneyConfirmed = async ({ email, amount }) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("amount", amount);

  try {
    const { data } = await api.post("/user/transfer-money/confirmed", formData);
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["An unexpected error occurred"],
      },
    };
  }
};

export const checkTransferReceiverExist = async (email) => {
  const formData = new FormData();
  formData.append("email", email);

  try {
    const { data } = await api.post("/user/transfer-money/exist", formData);
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["An unexpected error occurred"],
      },
    };
  }
};

export const getTransferMoneyInfo = async () => {
  try {
    const { data } = await api.get("/user/transfer-money/info");
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["An unexpected error occurred"],
      },
    };
  }
};

export const getWithdrawInfo = async () => {
  try {
    const { data } = await api.get("/user/withdraw/info");
    return data;
  } catch (error) {
    console.error("Error fetching withdraw info:", error);
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["Failed to load withdrawal information"],
      },
    };
  }
};

export const submitWithdrawInsert = async ({ gateway, amount }) => {
  try {
    const formData = new FormData();

    // BACKEND EXPECTS CURRENCY ALIAS HERE
    formData.append("gateway", gateway);
    formData.append("amount", amount);

    const response = await api.post("/user/withdraw/insert", formData);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["Network error or server unreachable"],
      },
    };
  }
};

export const submitFinalWithdraw = async (data) => {
  try {
    const formData = new FormData();

    // Required trx
    formData.append("trx", data.trx);

    // Append all dynamic fields (email, card_number, etc.)
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "trx") {
        formData.append(key, value);
      }
    });

    const response = await api.post(
      "/user/withdraw/manual/confirmed",
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["Network error or server unreachable"],
      },
    };
  }
};

export const getGoogle2FASetup = async () => {
  try {
    const { data } = await api.get("/user/security/google-2fa");
    return data;
  } catch (error) {
    "Error fetching 2FA setup:", error;

    if (error.response?.data) {
      return error.response.data;
    }

    return {
      message: { error: ["Failed to load 2FA setup information"] },
      data: null,
    };
  }
};

export const google2FAUpdateStatus = async () => {
  try {
    const { data } = await api.post("/user/security/google-2fa/status/update");
    return data;
  } catch (error) {
    "Error enabling Google 2FA:", error;
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: { error: ["An unexpected error occurred while enabling 2FA"] },
    };
  }
};

export const verifyGoogle2FA = async (otpCode) => {
  const formData = new FormData();
  formData.append("otp", otpCode);

  try {
    const { data } = await api.post("/user/google-2fa/otp/verify", formData);
    return data;
  } catch (error) {
    // ("2FA verification error:", error);
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: {
        error: ["Network error or server unreachable"],
      },
    };
  }
};

export const getAddMoneyInformation = async () => {
  try {
    const { data } = await api.get("/user/add-money/information");
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      message: { error: ["Failed to load add money information"] },
    };
  }
};

export const submitAddMoney = async ({ amount, currency }) => {
  const formData = new FormData();
  formData.append("amount", amount);
  formData.append("currency", currency); // alias of the selected gateway currency

  try {
    const { data } = await api.post("/user/add-money/submit-data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return { message: { error: ["An unexpected error occurred."] } };
  }
};

export const getUserTransactions = async (page = 1, limit = 12) => {
  try {
    const response = await api.get(
      `/user/transactions?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("getUserTransactions error:", error);
    if (error.response) {
      return error.response.data;
    }
    return {
      message: { error: ["Network error or server is not responding"] },
      data: { transactions: {} },
    };
  }
};
