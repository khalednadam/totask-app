<script setup>
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "../stores/auth";
import { useRouter } from "vue-router";
import axiosInstance from "../composables/axios";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast()
const authStore = useCurrentUser();
const router = useRouter();
const loading = ref(false);


const logout = () => {
  loading.value = true;
  axiosInstance
    .post(`/auth/logout`)
    .then(() => {
      authStore.$reset();
      router.push("/home");
    })
    .catch((err) => {
      toast.error("An error occurred");
    }).finally(() => {
      loading.value = false;
    })
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
          <v-btn :loading="loading" :disabled="loading" variant="tonal" text="Logout" color="error"
            @click="() => logout()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
