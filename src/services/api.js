import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (adds auth token if needed later)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (error handling)
api.interceptors.response.use(
  (response) => response.data, // Return data directly
  (error) => {
    // Handle common errors
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - please try again");
    } else if (error.response?.status === 404) {
      console.error("Resource not found");
    } else if (error.response?.status >= 500) {
      console.error("Server error - please try later");
    }
    return Promise.reject(error);
  }
);

// Job-related API functions (using dummyjson as mock)
export const jobApi = {
  fetchMockJobs: (limit = 10) => {
    return api.get(`/products?limit=${limit}`);
  },

  fetchMockJobById: (id) => {
    return api.get(`/products/${id}`);
  },


  searchMockJobs: (query) => {
    return api.get(`/products/search?q=${encodeURIComponent(query)}`);
  },

};

export default api;