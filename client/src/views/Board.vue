<script setup>
import { useRouter, useRoute } from "vue-router";
import { getBoardById } from "../composables/utils";
import { watch, defineAsyncComponent, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useFavoriteBoardsStore } from "@/stores/favoriteBoards";
import { socket } from "../composables/socket";
import { storeToRefs } from "pinia";
import { useDisplay } from "vuetify/lib/framework.mjs";
import axiosInstance from "../composables/axios";
import BoardNotFound from "../components/Board/BoardNotFound.vue";
import BoardClosed from "../components/Board/BoardClosed.vue";
import { useBoardStore } from "../stores/board";

const DangerDeleteModal = defineAsyncComponent(
  () => import("../components/Modals/DangerDeleteModal.vue")
);
const DraggableLists = defineAsyncComponent(
  () => import("../components/DraggableLists.vue")
);

const { mdAndUp } = useDisplay();
const favoriteBoardsStore = useFavoriteBoardsStore();
const route = useRoute();
const toast = useToast();
const isAdmin = ref(false);
const router = useRouter();
const { board, status, isLoading } = getBoardById(route.params.boardId);

const boardSettingsDialog = ref(false);
const deleteBoardDialog = ref(false);
const boardStore = useBoardStore();
const {
  currentBoard,
  currentStatus,
  sideDrawer,
  currentBoardIsAdmin,
  settingsDrawer,
} = storeToRefs(boardStore);
const drawer = ref(false);

watch(board, () => {
  currentBoard.value = board.value;
  currentStatus.value = status.value;
  isAdmin.value = board.value.isAdmin;
  currentBoardIsAdmin.value = isAdmin.value;
});

watch(drawer, () => {
  sideDrawer.value = drawer.value;
});

const deleteBoard = () => {
  isLoading.value = true;
  axiosInstance
    .delete(`/b/${route.params.boardId}`, { withCredentials: true })
    .then((res) => {
      success();
      socket.emit("change-board-info", route.params.boardId);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

watch(boardSettingsDialog, () => {
  settingsDrawer.value = boardSettingsDialog.value;
});

const success = () => {
  boardSettingsDialog.value = false;
  toast.success("Board updated");
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  localStorage.setItem("board-sidebar", drawer.value);
};

onMounted(async () => {
  socket.emit("subscribe", route.params.boardId);
  await favoriteBoardsStore.getFavoriteBoards();
  drawer.value =
    localStorage.getItem("board-sidebar") === "true" && mdAndUp.value
      ? true
      : false;
});

const handleDrawerShortcut = (e) => {
  if (e.ctrlKey && e.code === "Slash") {
    toggleDrawer();
  }
};
</script>

<template>
  <GlobalEvents
    @keyup.prevent="handleDrawerShortcut"
    @keyup.metaKey="() => toggleDrawer()"
    @keyup.slash="() => toggleDrawer()"
  />
  <v-main
    v-if="isLoading && !board"
    class="flex flex-col justify-center items-center gap-5 h-[95vh]"
  >
    <v-progress-circular
      color="primary"
      indeterminate="disable-shrink"
      size="50"
      width="5"
    ></v-progress-circular>
  </v-main>
  <div v-else>
    <v-main v-if="status > 205">
      <BoardNotFound />
    </v-main>
    <v-main
      v-if="status < 205"
      :style="{ backgroundColor: board?.backgroundColor }"
      class="h-screen overflow-x-auto"
    >
      <BoardClosed
        v-if="board?.closed"
        :workspaceId="board?.workspace.id"
        v-model="deleteBoardDialog"
      />
      <div class="flex flex-col items-start justify-start" v-else>
        <div class="flex max-h-[80vh] flex-1 mt-2">
          <Suspense v-if="board">
            <DraggableLists :is-workspace-premium="board.workspace.isPremium" />
          </Suspense>
        </div>
      </div>

      <DangerDeleteModal
        :is-loading="isLoading"
        v-model="deleteBoardDialog"
        :name="board?.name"
        @delete="deleteBoard"
      />
    </v-main>
  </div>
</template>

<style scoped>
:deep(.dp__input) {
  border-radius: 8px !important;
}

:deep(.dp__main) {
  width: 100%;
}

:deep(.dp__outer_menu_wrap) {
  width: 100%;
}

.v-divider {
  opacity: 20%;
}
</style>
<style>
@import url("../assets/override.css");
</style>
