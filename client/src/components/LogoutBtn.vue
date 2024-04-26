<script setup>
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "../stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";
import axiosInstance from "../composables/axios";
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const authStore = useCurrentUser();
const router = useRouter();


const logout = () => {
  axiosInstance
    .post(`/auth/logout`, null, {
      withCredentials: true,
    })
    .then(() => {
      authStore.$reset();
      router.push("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-list-item title="Logout" v-bind="props" base-color="red" variant="outlined" class="absolute end-0">
        <template #prepend>
          <Icon icon="ph:sign-out" width="25" />
        </template>

      </v-list-item>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Logout?">
        <v-card-text> Are you sure you want to logout? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" text="Cancel" @click="isActive.value = false"></v-btn>
          <v-btn variant="tonal" text="Logout" color="error" @click="() => logout()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
