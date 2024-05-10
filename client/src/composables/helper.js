import { useToast } from "vue-toastification";

const toast = useToast();

/**
 * Displays an error toast message extracted from the given error object.
 * @param {Error} err - The error object containing the response data.
 */
export const toastError = (err) => {
  let errorMessage = "An error occurred";

  if (err.response && err.response.data && err.response.data.message) {
    errorMessage = err.response.data.message;
  } else if (err.message) {
    errorMessage = err.message;
  }

  toast.error(errorMessage);
}
