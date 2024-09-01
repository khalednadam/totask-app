<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useRoute } from "vue-router";
import InBoardWorkspaceBoards from "./InBoardWorkspaceBoards.vue";

const route = useRoute();
const drawer = defineModel();
defineProps({
  workspaceName: String,
  isPremium: Boolean,
  workspaceId: String,
});
</script>
<template>
  <v-navigation-drawer
    class="text-white backdrop-blur-3xl"
    :style="{ backgroundColor: `rgba(var(--v-theme-background) , 0.2)` }"
    v-model="drawer"
    location="left"
  >
    <template v-slot:prepend>
      <v-list-item lines="two">
        <template v-slot:title>
          <div class="flex items-center gap-2">
            <p class="max-w-[110px] truncate">
              {{ workspaceName }}
            </p>
            <Icon
              v-if="isPremium"
              icon="ph:crown-simple-fill"
              width="20"
              color="gold"
            />
          </div>
        </template>
        <template v-slot:prepend>
          <v-avatar color="primary" rounded="lg">
            <Icon icon="ph:building-office" width="30" />
          </v-avatar>
        </template>
      </v-list-item>
    </template>
    <v-divider class="border-2 dark:border-white border-black"></v-divider>
    <v-list class="w-11/12 mx-auto space-y-2">
      <router-link :to="`/`">
        <v-list-item
          :active="route.fullPath === `/`"
          color="primary"
          title="Home"
        >
          <template #prepend>
            <Icon icon="ph:house" width="20" class="mr-1"> </Icon>
          </template>
        </v-list-item>
      </router-link>
      <router-link :to="`/w/${workspaceId}`">
        <v-list-item
          :active="route.fullPath === `/w/${workspaceId}`"
          color="primary"
          title="Boards"
        >
          <template #prepend>
            <Icon icon="ph:columns" width="20" class="mr-1"> </Icon>
          </template>
        </v-list-item>
      </router-link>
      <router-link :to="`/w/settings/${workspaceId}`">
        <v-list-item
          color="primary"
          title="Settings"
          :active="route.fullPath === '/settings'"
        >
          <template #prepend>
            <Icon icon="ph:gear" width="20" class="mr-1"> </Icon>
          </template>
        </v-list-item>
      </router-link>
      <v-divider class="border-2 dark:border-white border-black"></v-divider>
      <Suspense>
        <InBoardWorkspaceBoards :workspace-id="workspaceId" />
      </Suspense>
    </v-list>
  </v-navigation-drawer>
</template>
