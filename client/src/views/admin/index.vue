<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UsersStats from '../../components/Admin/UsersStats.vue';
import axiosInstance from '../../composables/axios';
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const route = useRoute();
const router = useRouter();

const page = ref(route.query.page || 1);
const isLoading = ref(false);
const users = ref({});
const getUsers = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/users/`, {
      params: {
        limit: 12,
        page: page.value
      },
      withCredentials: true
    });
    users.value = response.data;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
onMounted(async () => {
  await getUsers();
})
</script>
<template>
  <div class="my-5">
    <h1>
      Welcome
    </h1>
    <div>
      <UsersStats />
      <!-- {{ users.results }} -->
    </div>

    <!-- <v-pagination v-model="page" color="primary" @update:model-value="router.replace({ query: { page: page } })" -->
    <!--   :length="users.totalPages" rounded="large"></v-pagination> -->
  </div>
</template>
