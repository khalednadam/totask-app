<script setup>
import debounce from 'lodash.debounce'
import { ref, onMounted, watch } from 'vue';
import axiosInstance from '../../composables/axios';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import WorkspaceCard from '../../components/Admin/WorkspaceCard.vue';

const route = useRoute();

const search = ref(null);
const isLoading = ref(false);
const workspaces = ref({});
const page = ref(route.query.page || 1);
const getWorkspaces = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/w/`, {
      params: {
        limit: 12,
        page: page.value,
        name: search.value,
        sortBy: "createdAt:desc"
      },
      withCredentials: true
    });
    workspaces.value = response.data;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
onMounted(async () => {
  await getWorkspaces();
})


watch(search, debounce(async () => {
  if (search.value?.trim().length === 0 && typeof search.value === "string") {
    search.value = null
  }
  await getWorkspaces();
}, 500))
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="my-5">
        Workspaces
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
        <v-col cols="4" v-for="workspace in workspaces.results" :key="workspace._id">
          <WorkspaceCard :workspace="workspace" />
        </v-col>
      </v-row>
    </div>

    <v-pagination v-model="page" color="primary" @update:model-value="$router.replace({ query: { page: page } })"
      :length="workspaces.totalPages" rounded="large"></v-pagination>
  </div>
</template>


