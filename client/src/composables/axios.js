// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Set the base URL to include the '/api' prefix
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
    'Content-Type': 'application/json',
  },
  withCredentials: true // Ensure that credentials are sent with the request

});
axiosInstance.defaults.headers.post["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// Fetch the CSRF token and set it in Axios headers
async function fetchCsrfToken() {
  try {
    const response = await axiosInstance.get('/csrf-token');
    const csrfToken = response.data.csrfToken;

    // Set the CSRF token in Axios headers
    axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
}

await fetchCsrfToken();
export default axiosInstance;

