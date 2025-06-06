import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');  //Going further you'll write this from zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  console.log("Sending request with headers:", config.headers);
  console.log('Token retrieved for request:', token);
    return config;
})


api.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
          // Example: if you're using Zustand
          // useAuthStore.getState().setToken('');
          console.log('Error response:', err.response);
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
    
        // Optional: Handle other types of errors (like no response at all)
        if (!err.response) {
          console.error('Network error or no response from server:', err);
          // You can show a toast or fallback UI
        }
    
        return Promise.reject(err);
      }
)

export default api;