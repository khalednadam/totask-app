import { useToast } from "vue-toastification";

const toast = useToast();

/**
 * Displays an error toast message extracted from the given error object.
 * @param {Error} err - The error object containing the response data.
 */
export const toastError = (err) => {
  console.log(err);
  let errorMessage = "An error occurred";

  // Check if the error contains a response object and extract message from there
  if (err.response && err.response.data && err.response.data.message) {
    errorMessage = err.response.data.message;
  } else if (err.message) {
    // If no response object, try to get the message from the error object directly
    errorMessage = err.message;
  }

  // Display the error message using toast
  toast.error(errorMessage);
}
