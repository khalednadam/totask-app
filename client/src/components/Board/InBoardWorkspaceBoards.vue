<script setup>
import { useBoards } from "../../composables/utils";
import SidebarWorkspaceBoardItem from "../SidebarWorkspaceBoardItem.vue";
const props = defineProps({
  workspaceId: String,
});
const { boards, isLoading } = useBoards(props.workspaceId);
</script>
<template>
  <div v-if="isLoading">loading...</div>
  <div v-else>
    <v-list-item-subtitle class="">
      This workspace's boards
    </v-list-item-subtitle>
    <div class="mt-2 space-y-2">
      <SidebarWorkspaceBoardItem
        v-for="board in boards"
        :board-id="board.id"
        :board-background-color="board.backgroundColor"
        :board-name="board.name"
      />
    </div>
  </div>
</template>
