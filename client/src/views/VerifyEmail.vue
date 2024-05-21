<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../composables/axios';
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';


const route = useRoute();
const router = useRouter();


const loading = ref(false);
const token = ref(route.query.token);
const verifyEmail = async () => {
  loading.value = true;
  try {
    await axiosInstance.post("/auth/verify-email", {}, {
      params: {
        token: token.value
      },
    });
    router.push("/")
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await verifyEmail();
})

</script>
<template>
  <div class="w-full flex h-[100vh] flex-col justify-center items-center" v-if="loading">
    <h1 class="text-primary">
      Verifying email
    </h1>
    <p>
      You are being redirected to home page...
    </p>
  </div>
  <div class="w-full flex h-[100vh] flex-col justify-center items-center gap-5">
    <h1 class="text-error">
      Email verification failed
    </h1>
    <p>
      This can heppen if the verification token is timed out. Try re-sending the verification email from setings
    </p>
    <router-link to="/settings">
      <v-btn flat color="primary">
        <Icon icon="ph:gear" />
        Settings
      </v-btn>
    </router-link>
  </div>
</template>


