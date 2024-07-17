// Import axios and create an instance
import axios from "axios";

// Define base URL from environment variables or fallback
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Create an Axios instance
const apiService = axios.create({
  baseURL: BASE_URL,
  // You can add common headers here
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiService;
