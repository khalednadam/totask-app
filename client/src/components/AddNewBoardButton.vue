<script setup>
import { ref } from "vue";
import AddBoardModal from "./Modals/AddBoardModal.vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  workspace: String,
  members: Array,
  boards: Array,
  isCard: Boolean
});

const addNewBoardDialog = ref(false);
</script>
<template>
  <v-card v-if="isCard" height="120" variant="tonal" class="cursor-pointer"
    @click="addNewBoardDialog = !addNewBoardDialog">
    <v-card-text class="flex justify-center items-center flex-col h-full opacity-100">
      Add a new board
    </v-card-text>
    <v-dialog v-model="addNewBoardDialog">
      <AddBoardModal :members="members" :workspace="workspace" :boards="boards"
        @toggle-modal="() => (addNewBoardDialog = false)" @add-board="(newBoard) => boards.unshift(newBoard)" />
    </v-dialog>
  </v-card>
  <div v-else>
    <v-tooltip text="Add a board">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon variant="tonal" size="small" @click="addNewBoardDialog = !addNewBoardDialog">
          <Icon icon="ph:plus" width="20" />
        </v-btn>
      </template>
    </v-tooltip>
    <v-dialog scrollable v-model="addNewBoardDialog">
      <AddBoardModal :members="members" :workspace="workspace" :boards="boards"
        @toggle-modal="() => (addNewBoardDialog = false)" @add-board="(newBoard) => boards.unshift(newBoard)" />
    </v-dialog>
  </div>
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
