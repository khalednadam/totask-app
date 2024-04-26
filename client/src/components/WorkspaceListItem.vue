<script setup>
// IMPORTS
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "@/stores/auth";
import {
  amIAdmin,
  // getWorkspaceAdmins,
  // getWorkspaceMembers,
} from "../composables/utils";
import { computed } from "vue";
import UserProfile from "./UserProfile.vue";

// PROPS & EMITS
const props = defineProps({
  workspace: Object,
});
const emit = defineEmits(["openMemberDialig"]);

// INITS
const store = useCurrentUser();

// REFS
const workspaceMenu = ref(false);
const workspaceMembersDialog = ref(false);
const admins = ref(props.workspace.admins);
// members.value = workspace.value.members.filter(member => !admins.value.some(admin => admin.id === member.id))
const members = ref(props.workspace.members.filter(member => !admins.value.some(admin => admin.id === member.id)))
const isWorkspaceAdmin = computed(() => amIAdmin(props.workspace, store.user?.id));

</script>
<template>
  <div class="flex items-center justify-between gap-2">
    <div class="flex justify-center items-center gap-2">
      <v-avatar bg-color="red" color="grey" rounded="lg">
        {{ workspace.name[0].toUpperCase() }}
      </v-avatar>
      <v-tooltip :text="workspace.name" :open-delay="350">
        <template v-slot:activator="{ props }">
          <router-link :to="`/w/${workspace.id}`">
            <p v-bind="props" class="truncate max-w-[100px] cursor-pointer">
              {{ workspace.name }}
            </p>
          </router-link>
        </template>
      </v-tooltip>
    </div>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon variant="text" size="x-small">
          <Icon v-bind="props" icon="ph:caret-down" width="25" class="cursor-pointer"
            @click="workspaceMenu = !workspaceMenu"></Icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="() => (workspaceMembersDialog = true)">
          Members
        </v-list-item>
        <router-link :to="`/w/settings/${workspace.id}`" v-if="isWorkspaceAdmin">
          <v-list-item @click="() => { }"> Settings </v-list-item>
        </router-link>
        <v-list-item @click="$emit('openMemberDialog', workspace)">
          Add members
        </v-list-item>
      </v-list>
    </v-menu>
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
            <UserProfile v-for="admin in admins" :key="admin.id" :member="admin" />
          </v-list>
          <v-list class="space-y-3" v-if="members.length > 0">
            <v-list-subheader> Members </v-list-subheader>
            <UserProfile v-for="member in members" :key="member.id" :member />
          </v-list>
          <p v-else>There are no members in this workspace</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
