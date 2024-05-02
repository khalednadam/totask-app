<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../composables/axios';
import { onMounted } from 'vue';


const route = useRoute();
const router = useRouter();


const loading = ref(false);
const token = ref(route.query.token);
const verifyEmail = async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.post("/auth/verify-email", null, {
      params: {
        token: token.value
      }
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
  <div class="w-full flex h-[100vh] flex-col justify-center items-center ">
    <h1 class="text-primary">
      Verifying email
    </h1>
    <p>
      You are being redirected to home page...
    </p>
    <p>
      {{ token }}
    </p>
  </div>
</template>


