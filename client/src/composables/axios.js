// axiosInstance.js
import axios from 'axios';
import { toastError } from './helper';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Set the base URL to include the '/api' prefix
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL
  },
  withCredentials: true // Ensure that credentials are sent with the request
});

axiosInstance.interceptors.response.use(
  response => {
    // If the request was successful, pass the response as-is
    return response;
  },
  error => {
    // If the request resulted in an error response
    if (error.response) {
      // Handle error responses here
      toastError(error); // Display error message using your toastError function
    }
    return Promise.reject(error); // Reject the Promise to propagate the error further
  }
);
axiosInstance.defaults.headers.post["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axiosInstance;

