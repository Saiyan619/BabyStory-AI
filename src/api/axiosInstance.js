import axios from "axios";

// Basically the baseUrl im fetching my api routes from(Which is from the backend)
const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

});

// Helps insert token to my bearer so i dont have keep writing this same particular code in every function requiring authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); //Going further you'll write this from zustand
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log("Sending request with headers:", config.headers);
  // console.log("Token retrieved for request:", token);
  return config;
});

// Checks and removes once it notices a mistike in the token correlation
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Example: if you're using Zustand
      // useAuthStore.getState().setToken('');
      console.log("Error response:", err.response);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Optional: Handle other types of errors (like no response at all)
    if (!err.response) {
      console.error("Network error or no response from server:", err);
      // show a toast or fallback UI - Will do this...later
    }

    return Promise.reject(err);
  }
);

export default api;
