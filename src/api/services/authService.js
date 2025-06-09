import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/UiStore";
import api from "../axiosInstance";

// This code contains functions for user authentication, including :
// Login, sign up, fetching user initail data, logout, verifyEmail, forgotPassword, resetPassword.

const auth = useAuthStore.getState();
// auth.setUser(response.data);

// Login User
export const login = async (credentials) => {
  console.log("Logging in with credentials:", credentials);
  try {
    const response = await api.post("/api/parent/login", credentials);
    const auth = useAuthStore.getState();
    localStorage.setItem("token", response.data.token);
    auth.setToken(response.data.token);
    await Me();
  } catch (error) {
    throw error;
  }
};

// Register User
export const signUp = async (credentials) => {
  try {
    const response = await api.post("/api/parent/register", credentials);

    const auth = useAuthStore.getState();
    localStorage.setItem("token", response.data.token);
    auth.setToken(response.data.token);

    await Me(); // fetch user

    const freshAuth = useAuthStore.getState();
    // Send the verification Token as soon a s the user signs up sucessfully
    if (freshAuth.user && freshAuth.user.email) {
      await requestVerificationToken(freshAuth.user.email);
    } else {
      console.warn("User email not found for verification request.");
    }
    return response.data;
  } catch (error) {
    console.log("Signup error:", error);
    throw error;
  }
};

// Get User Initial Data
// This function fetches the initial user data after login or sign up

export const Me = async () => {
  const auth = useAuthStore.getState();

  try {
    const response = await api.get("/api/parent/me");
    auth.setUser(response.data);
    auth.setUserLoading(false);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch user data:", error);

    // On 401 or 404, clear the store
    auth.logout();
    auth.setUserLoading(false);
    return null;
  }
};

// update Me for updating thr user profile
export const updateMe = async (data) => {
  try {
    const response = await api.put("/api/parent/me", data);
    auth.setUser(response.data.user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Request Verification Email token
export const requestVerificationToken = async (email) => {
  try {
    const response = await api.post("/api/parent/verify-password/request", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Verify Email
export const verifyEmail = async (code) => {
  try {
    const response = await api.post("/api/parent/verify-password/verify", { code });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Forgot Password(sends a reset password link to the user email)
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/api/parent/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Resets password
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`/api/parent/reset-password/${token}`, {
      password,
    });
    console.log("Password reset successful:", response.data);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Sign Up/Sign In with Google - Oauth
export const authService = {
  initiateGoogleAuth: () => {
    console.log("Initiating Google OAuth");
    window.location.href = "http://localhost:8000/api/parent/auth/google";
  },
  googleAuth: () => {
    console.log("Starting Google authentication");
    window.location.href = "http://localhost:8000/api/parent/auth/google";
  },
};
