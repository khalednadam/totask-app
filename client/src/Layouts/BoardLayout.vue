<script setup>
// IMPORTS
import { useCurrentUser } from "@/stores/auth";
import BoardSideNavigationDrawer from "../components/Board/BoardSideNavigationDrawer.vue";
import { useBoardStore } from "../stores/board";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import BoardHeader from "../components/BoardHeader.vue";
import BoardInfoHeader from "../components/Board/BoardInfoHeader.vue";

// INITS
const route = useRoute();
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
// REFS
authStore.getUser();
</script>
<template>
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
  <slot> </slot>
</template>
<style scoped>
:deep(.v-navigation-drawer__content) {
  scrollbar-gutter: stable;
}
</style>
