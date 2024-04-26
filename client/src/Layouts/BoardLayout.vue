<script setup>
// IMPORTS
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "@/stores/auth";
import CreateWorkspace from "@/components/Modals/CreateWorkspaceModal.vue";
import AddMemberToWorkspaceModal from "@/components/Modals/AddMemberToWorkspaceModal.vue";
import BoardHeader from "../components/BoardHeader.vue";
import LogoutBtn from "../components/LogoutBtn.vue";
import { storeToRefs } from "pinia";


// INITS
const router = useRouter();
const authStore = useCurrentUser();

// REFS
const workspace = ref();
const { isLoading, user } = storeToRefs(authStore);
const createWorkspaceDialog = ref(false);
const addMembersDialog = ref(false);
const drawer = ref(false);
const workspaceInfo = ref({ name: undefined, id: undefined });
authStore.getUser();

</script>
<template>
  <v-main v-if="isLoading" class="flex flex-col justify-center items-center gap-5 h-[95vh]">
    <v-progress-circular color="primary" indeterminate="disable-shrink" size="50" width="5"></v-progress-circular>
  </v-main>
  <div v-else>
    <v-navigation-drawer v-model="drawer" location="left" color="base" v-if="status < 205">
      <template v-slot:prepend>
        <v-list-item lines="two" :title="board?.workspace.name">
          <template v-slot:prepend>
            <v-avatar color="primary" rounded="lg">
              {{ board?.workspace.name[0].toUpperCase() }}
            </v-avatar>
          </template>
        </v-list-item>
      </template>
      <v-divider class="border-2 dark:border-white border-black"></v-divider>
      <v-list class="w-11/12 mx-auto space-y-2">
        <router-link :to="`/`">
          <v-list-item :active="router.currentRoute.value.fullPath === `/`" color="primary" title="Home">
            <template #prepend>
              <Icon icon="ph:house" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link :to="`/w/${board?.workspace.id}`">
          <v-list-item :active="router.currentRoute.value.fullPath === `/w/${board?.workspace.id}`" color="primary"
            title="Boards">
            <template #prepend>
              <Icon icon="ph:columns" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link :to="`/w/settings/${board?.workspace.id}`">
          <v-list-item color="primary" title="Settings" :active="router.currentRoute.value.fullPath === '/settings'">
            <template #prepend>
              <Icon icon="ph:gear" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <v-divider class="border-2 dark:border-white border-black"></v-divider>
        <v-list-item-subtitle class="">
          This workspace's boards
        </v-list-item-subtitle>
        <div class="mt-2 space-y-2">
          <SidebarWorkspaceBoardItem v-for="board in board?.workspace.boards" :board-id="board.id"
            :board-background-color="board.backgroundColor" :board-name="board.name" />
        </div>
      </v-list>
    </v-navigation-drawer>
    <BoardHeader @toggle-drawer="() => toggleDrawer()" :drawer="drawer" />
    <v-main v-if="status > 205">
      <div class="mt-10">
        <v-row>
          <v-col>
            <div class="flex flex-col gap-3 justify-center items-center">
              <h1 class="text-center text-3xl">
                Board not found
              </h1>
              <p class="md:w-2/6 w-full mx-auto text-center">
                This board may be private. If someone gave you this link, they may need to
                invite you to their Workspace.
              </p>
              <router-link to="/">
                <v-btn color="primary" class="w-max">
                  Home
                </v-btn>
              </router-link>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-main>
    <slot>
    </slot>
  </div>
</template>
<style scoped>
:deep(.v-navigation-drawer__content) {
  scrollbar-gutter: stable;
}
</style>
