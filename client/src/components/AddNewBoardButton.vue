<script setup>
import { ref } from "vue";
import AddBoardModal from "./Modals/AddBoardModal.vue";

const props = defineProps({
  workspace: String,
  members: Array,
  boards: Array,
});

const addNewBoardDialog = ref(false);
</script>
<template>
  <v-card height="120" class="!bg-primary dark:!bg-primary/50 cursor-pointer"
    @click="addNewBoardDialog = !addNewBoardDialog" color="sd">
    <v-card-text class="flex justify-center items-center flex-col h-full opacity-100">
      Add a new board
    </v-card-text>
    <v-dialog v-model="addNewBoardDialog">
      <AddBoardModal :members="members" :workspace="workspace" :boards="boards"
        @toggle-modal="() => (addNewBoardDialog = false)" @add-board="(newBoard) => boards.unshift(newBoard)" />
    </v-dialog>
  </v-card>
</template>
<style scoped>
:deep(.v-btn--active > .v-btn__overlay,
  .v-btn[aria-haspopup="menu"][aria-expanded="true"] > .v-btn__overlay) {
  opacity: 0 !important;
}

:deep(.v-btn-toggle > .v-btn.v-btn--active:not(.v-btn--disabled) > .v-btn__overlay) {
  opacity: 0 !important;
}

.v-btn__underlay {
  opacity: 0 !important;
}
</style>
