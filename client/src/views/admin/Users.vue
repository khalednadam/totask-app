<script setup>
import debounce from 'lodash.debounce'
import { ref, onMounted, watch } from 'vue';
import axiosInstance from '../../composables/axios';
import { useRoute } from 'vue-router';
import UserCard from '../../components/Admin/UserCard.vue';
import { Icon } from '@iconify/vue';

const route = useRoute();

const search = ref(null);
const isLoading = ref(false);
const users = ref({});
const page = ref(route.query.page || 1);
const getUsers = async () => {
  isLoading.value = true;
  console.log(search.value || "hello");
  try {
    const response = await axiosInstance.get(`/users/`, {
      params: {
        limit: 12,
        page: page.value,
        username: search.value
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


watch(search, debounce(async () => {
  if (search.value?.trim().length === 0 && typeof search.value === "string") {
    search.value = null
  }
  await getUsers();
}, 500))
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="my-5">
        Users
      </h1>
      <div class="w-1/2">
        <v-text-field clearable hide-details label="Search" v-model="search">
          <template #append-inner>
            <Icon icon="ph:magnifying-glass" width="25" />
          </template>
        </v-text-field>
      </div>
    </div>
    <div>
      <v-row>
        <v-col cols="4" v-for="user in users.results" :key="user._id">
          <UserCard :user="user" />
        </v-col>
      </v-row>
    </div>

    <v-pagination v-model="page" color="primary" @update:model-value="$router.replace({ query: { page: page } })"
      :length="users.totalPages" rounded="large"></v-pagination>
  </div>
</template>


