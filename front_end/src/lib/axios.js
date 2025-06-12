import axios from "axios";

// Determine the base URL based on the environment
const baseURL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api" 
  : "https://hosp-pharm-2.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to handle cookies
axiosInstance.interceptors.request.use(config => {
  // Ensure credentials are included
  config.withCredentials = true;
  
  // Add cache control headers
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      console.error('Authentication error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
