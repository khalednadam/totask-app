import { useToast } from "vue-toastification";

const toast = useToast();

/**
 * Displays an error toast message extracted from the given error object.
 * @param {Error} err - The error object containing the response data.
 */
export const toastError = (err) => {
  console.log(err);
  const errorMessage = err.response.data;
  const regex = /<pre>Error: (.*?)<br>/;
  const match = errorMessage.match(regex);
  const extractedErrorMessage = match ? match[1] : null;
  toast.error(extractedErrorMessage)
}
