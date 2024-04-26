import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import axiosInstance from "../composables/axios";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const useCurrentUser = defineStore("currentUser", () => {
  const user = ref(null);
  const isLoading = ref(false);
  const assignUser = (userToAssign) => {
    user.value = userToAssign;
  }
  async function getUser() {
    isLoading.value = true;
    await axiosInstance(`/users/user`)
      .then((res) => {
        console.log(res.data);
        user.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        isLoading.value = false;
      })
  }
  function $reset() {
    user.value = null;
  }

  return { user, isLoading, getUser, assignUser, $reset };
});

