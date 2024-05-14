<script setup>
// IMPORTS
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "@/stores/auth";
import CreateWorkspace from "@/components/Modals/CreateWorkspaceModal.vue";
import AddMemberToWorkspaceModal from "@/components/Modals/AddMemberToWorkspaceModal.vue";
import Header from "../components/Admin/Header.vue";
import LogoutBtn from "../components/LogoutBtn.vue";

// env

// INITS
const { mdAndUp } = useDisplay();
const router = useRouter();
const authStore = useCurrentUser();

// REFS
const createWorkspaceDialog = ref(false);
const addMembersDialog = ref(false);
const drawer = ref(mdAndUp.value ? true : false);


onMounted(() => {
  authStore.getUser()
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
        <router-link to="/admin">
          <v-list-item :active="router.currentRoute.value.fullPath === '/admin'" color="primary" title="Home">
            <template #prepend>
              <Icon icon="ph:house" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link to="/admin/premiumRequests">
          <v-list-item :active="router.currentRoute.value.fullPath === '/admin/premiumRequests'" color="primary"
            title="Premium Requests">
            <template #prepend>
              <Icon icon="ph:envelope" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link to="/admin/workspaces">
          <v-list-item :active="router.currentRoute.value.fullPath === '/admin/workspaces'" color="primary"
            title="Workspaces">
            <template #prepend>
              <Icon icon="ph:building-office" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link to="/admin/users">
          <v-list-item :active="router.currentRoute.value.fullPath === '/admin/users'" color="primary" title="Users">
            <template #prepend>
              <Icon icon="ph:user" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link to="/admin/settings">
          <v-list-item color="primary" title="Settings"
            :active="router.currentRoute.value.fullPath === '/admin/settings'">
            <template #prepend>
              <Icon icon="ph:gear" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link to="/admin/blog">
          <v-list-item color="primary" title="Blog" :active="router.currentRoute.value.fullPath.includes('/admin/blog')">
            <template #prepend>
              <Icon icon="ph:newspaper" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <LogoutBtn />
      </v-list>
    </v-navigation-drawer>
    <Header @toggle-drawer="() => (drawer = !drawer)" :drawer="drawer" />
    <v-main>
      <!-- <v-container> -->
      <div class="mx-10">
        <slot></slot>
      </div>
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

