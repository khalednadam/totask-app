import { useToast } from "vue-toastification";

const toast = useToast();

/**
 * Displays an error toast message extracted from the given error object.
 * @param {Error} err - The error object containing the response data.
 */
export const toastError = (err) => {
  const errorMessage = err.response.data.message;
  toast.error(errorMessage)
}
