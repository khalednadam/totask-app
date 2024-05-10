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
axiosInstance.defaults.headers.post["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axiosInstance;

