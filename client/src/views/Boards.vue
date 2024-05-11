<script setup>
// IMPORTS
import { onMounted, ref } from "vue";
import BoardCard from "@/components/BoardCard.vue";
import WorkspaceSummary from "../components/WorkspaceSummary.vue";
import { getRecentWorkspaces } from "../composables/utils";
import { useFavoriteBoardsStore } from "@/stores/favoriteBoards";
import CreateWorkspace from "../components/Modals/CreateWorkspaceModal.vue"
import { storeToRefs } from "pinia";
import { useWorkspaces } from "../stores/workspaces";
import { Icon } from "@iconify/vue";

// INITS
const favoriteBoardsStore = useFavoriteBoardsStore();
const workspacesStore = useWorkspaces();

// REFS
const createWorkspaceDialog = ref(false);
// const { recentWorkspaces, isLoading } = getRecentWorkspaces();
const { recentWorkspaces, isLoading } = storeToRefs(workspacesStore);
const favoriteBoards = ref([]);
onMounted(async () => {
  await favoriteBoardsStore.getFavoriteBoards();
  favoriteBoards.value = favoriteBoardsStore.favoriteBoards;
});
</script>

<template>
  <div v-if="isLoading" class="flex flex-col justify-center items-center gap-5 h-[95vh]">
    <v-progress-circular color="primary" indeterminate="disable-shrink" size="50" width="5"></v-progress-circular>
  </div>
  <div v-else>
    <v-container>
      <v-row v-if="favoriteBoardsStore.favoriteBoards?.length > 0" class="mb-3">
        <v-col cols="12">
          <div class="flex items-center pb-3 space-x-2">
            <v-avatar color="grey" rounded="lg" size="large" class="w-full">
              <Icon icon="ph:star-fill" width="30" />
            </v-avatar>
            <h4 class="font-normal">Favorite Boards</h4>
          </div>
          <v-row class="">
            <v-col cols="12" md="3" v-for="favBoard in favoriteBoardsStore?.favoriteBoards">
              <BoardCard :board="favBoard" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div v-if="recentWorkspaces?.length > 0 && recentWorkspaces" class="w-full" v-for="workspace in recentWorkspaces"
        :key="workspace">
        <WorkspaceSummary :key="favoriteBoards || favoriteBoardsStore" :workspace="workspace"
          :favoriteBoards="favoriteBoardsStore?.favoriteBoards" />
      </div>
      <div class="flex flex-col justify-center items-center gap-5 h-[95vh]" v-else>
        <h2>
          There are no workspaces
        </h2>
        <v-btn size="large" variant="flat" color="primary" @click="createWorkspaceDialog = true">
          Create workspace
        </v-btn>
        <v-dialog v-model="createWorkspaceDialog">
          <CreateWorkspace @toggle-modal="() => (createWorkspaceDialog = false)" />
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>
<style scoped>
:deep(.v-divider) {

  opacity: 20;
}
</style>
