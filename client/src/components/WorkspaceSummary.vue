<script setup>
import AddNewBoardButton from "./AddNewBoardButton.vue";
import BoardCard from "./BoardCard.vue";
import { useCurrentUser } from "../stores/auth";
import { amIAdmin, useBoards } from "../composables/utils";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import UserProfile from "./UserProfile.vue";


// PROPS & EMITS
const props = defineProps({
  workspace: Object,
  favoriteBoards: Array,
});

const authStore = useCurrentUser();
const workspaceMembersDialog = ref(false);
const { boards, isLoading } = useBoards(props.workspace.id, "updatedAt:desc", 4)
const { isAdmin } = amIAdmin(props.workspace, authStore.user.id);
</script>
<template>
  <div class="flex mb-10 flex-col">
    <div class="flex items-center space-x-2 justify-between" :key="boards">
      <div class="flex items-center pb-3 space-x-2">
        <v-avatar color="primary" rounded="lg" size="large" class="w-full">
          <Icon icon="ph:building-office" width="30" />
        </v-avatar>
        <h4 class="font-normal">{{ workspace.name }}</h4>
      </div>
      <div class="flex items-center gap-2">
        <AddNewBoardButton :is-card="false" v-if="isAdmin || workspace.canMemberAddBoards" :workspace="workspace.id"
          @click="() => { }" :members="workspace.members" :boards="boards" />
        <router-link :to="`/w/settings/${workspace.id}`" v-if="isAdmin">
          <v-btn v-if="amIAdmin(workspace, authStore.user.id)" icon variant="tonal" size="small">
            <Icon icon="ph:gear" width="20" />
          </v-btn>
        </router-link>
        <v-btn icon variant="tonal" size="small" @click="() => workspaceMembersDialog = true">
          <Icon icon="ph:user" width="20" />
        </v-btn>
      </div>
    </div>
    <v-row>
      <v-col v-if="isLoading" cols="12" md="3" v-for="i in 3" :key="i">
        <v-skeleton-loader class="h-[125px] overflow-hidden rounded-lg" rounded="lg" type="card"></v-skeleton-loader>
      </v-col>
      <v-col v-else cols="12" md="3" v-for="board in boards" :key="board.id">
        <BoardCard :key="board.id" :board="board" />
      </v-col>
      <v-col cols="12" md="3">
        <router-link :to="`/w/${workspace.id}`">
          <v-card height="120" class="cursor-pointer" variant="tonal">
            <v-card-text class="flex justify-center items-center flex-col h-full opacity-100">
              See All
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
    <v-dialog class="max-w-[500px]" v-model="workspaceMembersDialog">
      <v-card>
        <v-card-text class="relative">
          <div class="flex justify-between items-center">
            <v-card-title> Workspace Members </v-card-title>
            <v-btn @click="() => (workspaceMembersDialog = false)" size="x-small" class="absolute right-0 bottom-0" icon
              variant="text">
              <Icon icon="ph:x" width="25" />
            </v-btn>
          </div>
          <v-list class="space-y-3">
            <v-list-subheader> Admins </v-list-subheader>
            <UserProfile v-for="admin in workspace.admins" :key="admin.id" :member="admin" />
          </v-list>
          <v-list class="space-y-3" v-if="workspace.members.length > 0">
            <v-list-subheader> Members </v-list-subheader>
            <UserProfile v-for="member in workspace.members" :key="member.id" :member />
          </v-list>
          <p v-else>There are no members in this workspace</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
