<script setup>
import axiosInstance from "../../composables/axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { socket } from "../../composables/socket";

const route = useRoute();
const router = useRouter();

const deleteBoardDialog = defineModel();
const props = defineProps({
  workspaceId: String,
});

const isLoading = ref(false);

const reopenBoard = () => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/b/${route.params.boardId}`,
      {
        workspace: props.workspaceId,
        closed: false,
      },
      { withCredentials: true }
    )
    .then((res) => {
      socket.emit("change-board-info", route.params.boardId);
      router.go(`/b/${res.data.id}`);
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <div class="flex h-full w-full justify-center items-center">
    <v-card class="w-2/3 h-2/3 !flex flex-col justify-center items-center">
      <v-card-text
        class="my-auto flex justify-center items-center flex-col space-y-2"
      >
        <h1 class="text-center">This Board is closed</h1>
        <div class="flex flex-col justify-center items-center space-y-10">
          <v-btn variant="flat" color="primary" @click="() => reopenBoard()">
            Reopen board
          </v-btn>
          <v-btn
            variant="text"
            color="primary"
            @click="deleteBoardDialog = true"
          >
            Permanently delete board
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
