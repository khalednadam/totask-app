<script setup>
// IMPORTS
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "@/stores/auth";
import CreateWorkspace from "@/components/Modals/CreateWorkspaceModal.vue";
import AddMemberToWorkspaceModal from "@/components/Modals/AddMemberToWorkspaceModal.vue";
import WorkspaceListItem from "../components/WorkspaceListItem.vue";
import Header from "../components/Header.vue";
import LogoutBtn from "../components/LogoutBtn.vue";
import { getWorkspaces } from "../composables/utils";
import { createDeviceDetector } from "next-vue-device-detector";

const d = createDeviceDetector()
const isMobile = ref(d.mobile);
// INITS
const { mdAndUp } = useDisplay();
const router = useRouter();
const authStore = useCurrentUser();

// REFS
const createWorkspaceDialog = ref(false);
const addMembersDialog = ref(false);
const drawer = ref(mdAndUp.value ? true : false);
const showWorkspaces = ref(false);
const { myAdminWorkspaces, myMemberWorkspaces } = getWorkspaces();
const workspaceInfo = ref(null);

// FUNCTIONS
const openAddMemberDialog = (workspace) => {
  workspaceInfo.value = workspace;
  addMembersDialog.value = !addMembersDialog.value;
};
const toggleShowWorkspaces = () => {
  showWorkspaces.value = !showWorkspaces.value;
  localStorage.setItem("show-workspaces", showWorkspaces.value);
};

onMounted(() => {
  authStore.getUser();
  showWorkspaces.value =
    localStorage.getItem("show-workspaces") === "true" ? true : false;
});
watch(addMembersDialog, () => {
  if (!addMembersDialog.value) {
    workspaceInfo.value = null;
  }
});
</script>

<template>
  <div>
    <v-navigation-drawer :permanent="mdAndUp" v-model="drawer" location="left" v-if="authStore.user" color="base">
      <template v-slot:prepend>
        <router-link to="/settings">
          <v-list-item link lines="two" :title="authStore.user.name" :subtitle="'@' + authStore.user.username">
            <template #prepend>
              <v-avatar color="primary" class="ring-white ring-2 border-white border-2">
                <p v-if="!authStore.user.profilePhotoUrl">
                  {{ authStore.user.name[0].toUpperCase() }}
                </p>
                <v-img :src="authStore.user.profilePhotoUrl" v-else></v-img>
              </v-avatar>
            </template>
          </v-list-item>
        </router-link>
      </template>

      <v-list class="w-11/12 mx-auto space-y-2">
        <router-link to="/">
          <v-list-item :active="router.currentRoute.value.fullPath === '/'" color="primary" title="Home">
            <template #prepend>
              <Icon icon="ph:house" width="20" class="mr-1"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link to="/settings">
          <v-list-item color="primary" title="Settings" :active="router.currentRoute.value.fullPath === '/settings'">
            <template #prepend>
              <Icon icon="ph:gear" width="20" class="mr-1"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <v-list-item class="flex flex-row items-center justify-between">
          <div class="flex items-center justify-between">
            Workspaces
            <div class="flex items-center gap-1">
              <v-tooltip text="Create a workspace" :open-delay="1000">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon variant="text" size="xx-small">
                    <Icon icon="ph:plus" width="20" class="cursor-pointer"
                      @click="createWorkspaceDialog = !createWorkspaceDialog" />
                  </v-btn> </template></v-tooltip>
              <v-tooltip :text="showWorkspaces ? 'hide workspace' : 'show workspaces'" :open-delay="1000">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon variant="text" size="xx-small" @click="() => toggleShowWorkspaces()">
                    <Icon :icon="showWorkspaces ? 'ph:caret-up' : 'ph:caret-down'" width="20" class="cursor-pointer" />
                  </v-btn> </template></v-tooltip>
            </div>
          </div>
        </v-list-item>
        <v-list class="items-start flex flex-col" v-show="showWorkspaces">
          <v-list-item-subtitle class="pb-5" v-if="myAdminWorkspaces && myAdminWorkspaces.length">
            Your workspaces
          </v-list-item-subtitle>
          <v-list-item v-for="workspace in myAdminWorkspaces" :key="workspace" class="w-full items-start">
            <WorkspaceListItem :workspace="workspace" @open-member-dialog="() => openAddMemberDialog(workspace)" />
          </v-list-item>
          <v-list-item-title v-if="myMemberWorkspaces && myMemberWorkspaces.length">
            <v-list-item-subtitle class="pt-7 pb-5">
              Workspaces you're a member in
            </v-list-item-subtitle>
          </v-list-item-title>
          <v-list-item v-for="workspace in myMemberWorkspaces" :key="workspace" class="w-full items-start">
            <WorkspaceListItem :workspace="workspace" @open-member-dialog="() => openAddMemberDialog(workspace)" />
          </v-list-item>
        </v-list>
        <LogoutBtn />
      </v-list>
    </v-navigation-drawer>
    <Header @toggle-drawer="() => (drawer = !drawer)" :drawer="drawer" />
    <v-main v-if="authStore.user">
      <!-- <v-container> -->
      <v-alert v-if="isMobile" class="mx-1 my-5" color="background"
        text="For optimal performance and full functionality, we recommend accessing totask on a desktop or laptop computer."
        type="warning"></v-alert>
      <div class="mx-10">
        <slot></slot>
      </div>
      <v-alert v-if="!authStore.user.isEmailVerified" color="warning" icon="$warning" variant="elevated" border="start"
        density="compact" class="w-[400px] !fixed bottom-2 right-2"
        text="Your email is not verified you cannot be added to any workspace. please verify it from settings"></v-alert>
      <!-- </v-container> -->
      <v-dialog v-model="createWorkspaceDialog">
        <CreateWorkspace @toggle-modal="() => (createWorkspaceDialog = false)" />
      </v-dialog>
      <v-dialog v-model="addMembersDialog">
        <AddMemberToWorkspaceModal :workspaceInfo="workspaceInfo" @toggle-modal="() => (addMembersDialog = false)" />
      </v-dialog>
    </v-main>
  </div>
</template>
<style scoped>
:deep(.v-navigation-drawer__content) {
  scrollbar-gutter: stable;
}
</style>
