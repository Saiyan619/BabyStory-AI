import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/UiStore";
import api from "../axiosInstance";

// This file contains functions for user authentication, including :
// Login, sign up, fetching user initail data, logout, verifyEmail, forgotPassword, resetPassword.

const auth = useAuthStore.getState();
// auth.setUser(response.data);

// Login User
 export const login = async (credentials) => {
    console.log("Logging in with credentials:", credentials);
    try {
        const response = await api.post('/parent/login', credentials)
    console.log(response.data);
        const auth = useAuthStore.getState();
        localStorage.setItem('token', response.data.token);
    auth.setToken(response.data.token)
    console.log(auth.token)
    await Me();
    console.log("Login successful")
    } catch (error) {
      console.log(error)
      throw error; 
    }
}


// Register User
export const signUp = async (credentials) => {
  try {
    const response = await api.post('/parent/register', credentials);
    console.log("Register response:", response.data);
    
    const auth = useAuthStore.getState();
    localStorage.setItem('token', response.data.token);
    auth.setToken(response.data.token);
    
    await Me();  // fetch user

    const freshAuth = useAuthStore.getState();
    console.log("User from store after Me():", freshAuth.user);

    if (freshAuth.user && freshAuth.user.email) {
      await requestVerificationToken(freshAuth.user.email);
      console.log("Verification token requested for:", freshAuth.user.email);
    } else {
      console.warn("User email not found for verification request.");
    }

    console.log("Sign up successful");
  } catch (error) {
    console.log("Signup error:", error);
    throw error;
  }
};


// Get User Initial Data
// This function fetches the initial user data after login or sign up
// services/authService.js

export const Me = async () => {
  const auth = useAuthStore.getState();

  try {
    const response = await api.get("/parent/me");
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

// update Me
export const updateMe = async (data) => {
  try {
    const response = await api.put("/parent/me", data )
    auth.setUser(response.data.user)
    console.log(response.data.user)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}


//Request Verification Email token
export const requestVerificationToken = async (email) => {
  try {
    const response = await api.post('/parent/verify-password/request', { email });
    console.log("response:", response.data)
  } catch (error) {
    console.error(error)
  }
}

// Verify Email
export const verifyEmail = async (code) => {
  try {
    const response = await api.post('/parent/verify-password/verify', { code })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/parent/forgot-password', { email })
    console.log("Forgot password request successful:", response.data);
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`/parent/reset-password/${token}`, { password });
    console.log("Password reset successful:", response.data);
  }
  catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}


export const authService = {
  initiateGoogleAuth: () => {
    console.log('Initiating Google OAuth');
    window.location.href = 'http://localhost:8000/api/parent/auth/google';
  },
  googleAuth: () => {
    console.log('Starting Google authentication');
    window.location.href = 'http://localhost:8000/api/parent/auth/google';
  },
};