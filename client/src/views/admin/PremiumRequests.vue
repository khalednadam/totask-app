<script setup>
import { ref, watchEffect, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../../composables/axios';

const route = useRoute();
const router = useRouter();

const actionLoading = ref(false);
const isLoading = ref(false);
const requests = ref([]);
const page = ref(Number(route.query.page) || 1)
const getRequests = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/premium-request/all`, {
      params: {
        limit: 9,
        page: page.value
      },
    })
    console.log(response);
    requests.value = response.data;
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false;
  }
}
watchEffect(async () => {
  await getRequests();
})

const changePage = (nextPage) => {
  window.history.replaceState(null, '', `?page=${nextPage}`)
  page.value = nextPage;
}

const accept = async (requestId) => {
  actionLoading.value = true;
  try {
    await axiosInstance.post(`/premium-request/accept/${requestId}`);
    await getRequests();
  } catch (err) {
    console.log(err);
  } finally {
    actionLoading.value = false;
  }
}

const deleteReq = async (requestId) => {
  actionLoading.value = true;
  try {
    await axiosInstance.delete(`/premium-request/${requestId}`);
    await getRequests();
  } catch (err) {
    console.log(err);
  } finally {
    actionLoading.value = false;
  }
}

const selectPage = () => {
  window.history.replaceState(null, '', `?page=${page.value}`)
}

watch(page, () => {
  getRequests();
}, { deep: true, immediate: true, })
</script>

<template>
  <div>
    <div class="mt-3 flex justify-between">
      <h1>
        Premium Requests
      </h1>
    </div>
    <v-row class="mt-5">
      <template v-if="isLoading">
        <v-col cols="12" md="3" v-for="i in 12">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" md="3" v-for="req in requests.results">
          <v-card>
            <v-card-title>
              {{ req.workspace.name }}
            </v-card-title>
            <v-card-text>
              By: @{{ req.user.username }}
            </v-card-text>
            <v-card-actions class="flex items-center justify-center">
              <v-btn :loading="actionLoading" :disabled="actionLoading" @click="() => deleteReq(req.id)" variant="flat"
                color="error" class="w-1/2">
                Decline
              </v-btn>
              <v-btn :loading="actionLoading" :disabled="actionLoading" @click="() => accept(req.id)" variant="flat"
                color="primary" class="w-1/2">
                Accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>

    <v-pagination v-model="page" color="primary" @update:model-value="(page) => selectPage(page)"
      :length="requests.totalPages" rounded="large"></v-pagination>
  </div>
</template>
