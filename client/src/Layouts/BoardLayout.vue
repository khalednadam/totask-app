<script setup>
import { useCurrentUser } from "@/stores/auth";
import BoardSideNavigationDrawer from "../components/Board/BoardSideNavigationDrawer.vue";
import { useBoardStore } from "../stores/board";
import { storeToRefs } from "pinia";
import BoardHeader from "../components/Board/BoardHeader.vue";
import BoardInfoHeader from "../components/Board/BoardInfoHeader.vue";
import { useCardDetailsStore } from "../stores/cardDetails";
import { createDeviceDetector } from "next-vue-device-detector";
import { defineAsyncComponent, ref } from "vue";

const BoardSettings = defineAsyncComponent(
  () => import("../components/Board/BoardSettings.vue")
);
const BoardInfo = defineAsyncComponent(
  () => import("../components/Board/BoardInfo.vue")
);
const CardDetails = defineAsyncComponent(
  () => import("../components/Modals/CardDetails.vue")
);

// INITS
const d = createDeviceDetector();
const isMobile = ref(d.mobile);
const authStore = useCurrentUser();
const boardStore = useBoardStore();
const {
  currentBoard,
  currentStatus,
  sideDrawer,
  currentBoardIsAdmin,
  settingsDrawer,
} = storeToRefs(boardStore);
const toggleDrawer = () => {
  sideDrawer.value = !sideDrawer.value;
  localStorage.setItem("board-sidebar", sideDrawer.value);
};
const cardDetailsStore = useCardDetailsStore();

const { isActive } = storeToRefs(cardDetailsStore);
// REFS
authStore.getUser();
</script>
<template>
  <v-alert
    v-if="isMobile"
    closable
    class="mx-1 !z-[9999] ! my-5 !fixed"
    color="background"
    text="For optimal performance and full functionality, we recommend accessing totask on a desktop or laptop computer."
    type="warning"
  ></v-alert>
  <BoardSideNavigationDrawer
    v-if="currentStatus < 205 && currentBoard"
    v-model="sideDrawer"
    :workspace-name="currentBoard?.workspace.name"
    :is-premium="currentBoard?.workspace.isPremium"
    :workspace-id="currentBoard?.workspace.id"
  />
  <BoardHeader @toggle-drawer="() => toggleDrawer()" :drawer="sideDrawer" />
  <BoardInfoHeader
    :board-members="currentBoard?.members"
    :board-name="currentBoard?.name"
    :board-labels="currentBoard?.labels"
    :is-admin="currentBoardIsAdmin"
    v-model:board-settings-drawer="settingsDrawer"
    v-model:is-board-favorite="currentBoard.isFavorite"
  />

  <v-navigation-drawer
    v-if="currentBoard"
    location="right"
    temporary
    v-model="settingsDrawer"
    width="500"
  >
    <v-list v-if="currentBoardIsAdmin">
      <BoardSettings
        :workspaceAllMembers="currentBoard.workspace.members"
        v-model:boardSettingsDialog="settingsDrawer"
        v-model:board="currentBoard"
        @success="() => success()"
      />
    </v-list>
    <v-list v-else>
      <BoardInfo :board="currentBoard" />
    </v-list>
  </v-navigation-drawer>

  <slot> </slot>
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
</template>
<style scoped>
:deep(.v-navigation-drawer__content) {
  scrollbar-gutter: stable;
}
</style>
