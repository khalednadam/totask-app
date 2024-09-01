<script setup>
import { useRouter, useRoute } from "vue-router";
import { getBoardById } from "../composables/utils";
import { watch, defineAsyncComponent, ref, onMounted, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useToast } from "vue-toastification";
import { useFavoriteBoardsStore } from "@/stores/favoriteBoards";
import { socket } from "../composables/socket";
import { storeToRefs } from "pinia";
import { useCardDetailsStore } from "../stores/cardDetails";
import { useDisplay } from "vuetify/lib/framework.mjs";
import axiosInstance from "../composables/axios";
import { createDeviceDetector } from "next-vue-device-detector";
import BoardNotFound from "../components/Board/BoardNotFound.vue";
import BoardClosed from "../components/Board/BoardClosed.vue";
import { useBoardStore } from "../stores/board";

const d = createDeviceDetector();
const isMobile = ref(d.mobile);

const DangerDeleteModal = defineAsyncComponent(
  () => import("../components/Modals/DangerDeleteModal.vue")
);
const DraggableLists = defineAsyncComponent(
  () => import("../components/DraggableLists.vue")
);

const BoardSettings = defineAsyncComponent(
  () => import("../components/Board/BoardSettings.vue")
);

const BoardInfo = defineAsyncComponent(
  () => import("../components/Board/BoardInfo.vue")
);

const CardDetails = defineAsyncComponent(
  () => import("../components/Modals/CardDetails.vue")
);

const { mdAndUp } = useDisplay();
const favoriteBoardsStore = useFavoriteBoardsStore();
const route = useRoute();
const toast = useToast();
const isAdmin = ref(false);
const router = useRouter();
const { board, status, isLoading } = getBoardById(route.params.boardId);
const showAddList = ref(false);
const newListName = ref("");
const boardSettingsDialog = ref(false);
const isAddingListLoading = ref(false);
const deleteBoardDialog = ref(false);
const cardDetailsStore = useCardDetailsStore();
const { isActive } = storeToRefs(cardDetailsStore);
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

let boardCopy = reactive(board);

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

const addList = () => {
  isAddingListLoading.value = true;
  axiosInstance
    .post(
      `/list/create`,
      {
        board: route.params.boardId,
        name: newListName.value,
      },
      {
        withCredentials: true,
      }
    )
    .then(() => {
      newListName.value = "";
      toast.success("List created");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isAddingListLoading.value = false;
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
        <v-alert
          v-if="isMobile"
          colsable
          class="mx-1 z-50 ! my-5 !fixed"
          color="background"
          text="For optimal performance and full functionality, we recommend accessing totask on a desktop or laptop computer."
          type="warning"
        ></v-alert>
        <div class="flex max-h-[80vh] flex-1 mt-2">
          <Suspense v-if="board">
            <DraggableLists :is-workspace-premium="board.workspace.isPremium" />
          </Suspense>
          <div class="min-w-[350px]">
            <v-btn
              text="Add a new list"
              color="list"
              class="flex w-[272px] font-bold justify-start text-start rounded"
              height="60"
              rounded="lg"
              v-if="!showAddList"
              @click="() => (showAddList = true)"
              variant="flat"
              elevation="1"
            >
              <template v-slot:prepend>
                <Icon icon="ph:plus" class=""></Icon>
              </template>
            </v-btn>
            <v-card
              color="list"
              rounded="lg"
              class="w-[272px]"
              v-else
              v-click-outside="() => (showAddList = false)"
              @keypress.enter="addList()"
              @keydown.esc="showAddList = false"
            >
              <div class="px-2 py-2">
                <v-text-field
                  autofocus
                  placeholder="List name"
                  hide-details
                  v-model="newListName"
                >
                </v-text-field>
                <div class="space-x-2 mt-3">
                  <v-btn
                    color="primary"
                    class=""
                    :disabled="newListName.length === 0 || isAddingListLoading"
                    :loading="isAddingListLoading"
                    @click="() => addList()"
                  >
                    Add list
                  </v-btn>
                  <v-btn
                    variant="text"
                    class=""
                    icon
                    size="35"
                    @click="() => (showAddList = false)"
                  >
                    <Icon icon="ph:x"></Icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>

      <!-- Board Settings  -->
      <v-navigation-drawer
        v-if="boardCopy"
        location="right"
        temporary
        v-model="settingsDrawer"
        width="500"
      >
        <v-list v-if="isAdmin">
          <BoardSettings
            :workspaceAllMembers="board.workspace.members"
            v-model:boardSettingsDialog="settingsDrawer"
            v-model:board="board"
            @success="() => success()"
          />
        </v-list>
        <v-list v-else>
          <BoardInfo :board />
        </v-list>
      </v-navigation-drawer>

      <!-- Card details dialog -->
      <v-dialog
        transition="dialog-bottom-transition"
        class="md:max-w-[90vw] w-full mx-auto"
        v-model="isActive"
        :close-on-back="false"
        persistent
      >
        <Suspense>
          <CardDetails />
          <template #fallback>
            <v-card
              class="2xl:w-[35vw] min-h-[60vh] xl:w-[50vw] w-full mx-auto flex justify-center items-center"
            >
              <v-card-text class="mx-auto justify-center flex items-center">
                <v-progress-circular
                  color="primary"
                  indeterminate="disable-shrink"
                  size="50"
                  width="5"
                ></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
        </Suspense>
      </v-dialog>
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
