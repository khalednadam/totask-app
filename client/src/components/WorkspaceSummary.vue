<script setup>
import AddNewBoardButton from "./AddNewBoardButton.vue";
import BoardCard from "./BoardCard.vue";
import { useCurrentUser } from "../stores/auth";
import { amIAdmin, useBoards } from "../composables/utils";
import { RouterLink } from "vue-router";
import { ref } from "vue";
const authStore = useCurrentUser();

// PROPS & EMITS
const props = defineProps({
  workspace: Object,
  favoriteBoards: Array,
});

const { boards, isLoading } = useBoards(props.workspace.id, "updatedAt:desc", 4)
// const boards = ref(props.workspace.boards);
console.log(boards.value);

</script>
<template>
  <div class="flex items-center py-5 space-x-2" :key="boards">
    <v-avatar color="primary" rounded="lg" size="large" class="w-full">
      {{ workspace.name[0].toUpperCase() }}
    </v-avatar>
    <h4 class="font-normal">{{ workspace.name }}</h4>
  </div>
  <v-row>
    <v-col cols="12" md="3" v-if="amIAdmin(workspace, authStore.user?.id) || workspace.canMemberAddBoards
      ">
      <AddNewBoardButton :workspace="workspace.id" @click="() => { }" :members="workspace.members" :boards="boards" />
    </v-col>
    <v-col v-if="isLoading" cols="12" md="3" v-for="i in 3" :key="i">
      <v-skeleton-loader class="h-[125px] overflow-hidden rounded-lg" rounded="lg" type="card"></v-skeleton-loader>
    </v-col>
    <v-col v-else cols="12" md="3" v-for="board in boards" :key="board.id">
      <BoardCard :key="board.id" :board="board" />
    </v-col>
    <v-col cols="12" md="3">
      <router-link :to="`/w/${workspace.id}`">
        <v-card height="120" class="!bg-primary dark:!bg-primary/50 cursor-pointer">
          <v-card-text class="flex justify-center items-center flex-col h-full opacity-100">
            See All
          </v-card-text>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>
