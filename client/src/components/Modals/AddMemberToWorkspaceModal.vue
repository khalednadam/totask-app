<script setup>

// IMPORTS
import { watch, ref } from "vue";
import debounce from 'lodash.debounce'
import axios from "axios";
import { useToast } from "vue-toastification";
import UserProfile from "../UserProfile.vue";
import axiosInstance from "../../composables/axios";
// env
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

// PROPS & EMITS
const props = defineProps({
  workspaceInfo: Object,
});
const emit = defineEmits(["toggleModal"]);
const usersMenu = ref(false);
// INTIS
const toast = useToast();
// REFS
const userToAdd = ref();
const userToInvite = ref("");
const users = ref([]);
// FUNCTIONS
const inviteNewUser = () => {
  axiosInstance
    .post(
      `/w/addUserTo/${props.workspaceInfo.id}`,
      {
        userEmail: userToInvite.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      emit("toggleModal");
      // socket.emit("update-workspace", "workspace updated");
      toast.success("User added successfully")
    })
    .catch((err) => {
      console.log(err);
    });
};
const searchForUsers = async () => {
  try {
    if (userToInvite.value?.length > 0) {
      const response = await axiosInstance.get(`/users/getUsers`, {
        withCredentials: true,
        params: {
          limit: 5,
          email: userToInvite.value
        }
      })
      // console.log(response.data)
      users.value = response.data;
    }
  } catch (err) {
    console.log(err);
  }
}
watch(userToInvite, debounce(() => {
  searchForUsers();
  if (users.value || users.value.trim().length > 0) {
    usersMenu.value = true;
  } else {
    usersMenu.value = false;
  }
  if (userToInvite.value.length === 0) {
    users.value = [];
  }
}, 500))
</script>
<template>
  <v-card class="self-center h-full overflow-hidden" rounded="lg">
    <v-row class="max-w-[500px]">
      <v-col cols="12" lg="12" class="">
        <h1 class="px-5 py-3">
          <h1 class="text-3xl">Invite a member to {{ workspaceInfo.name }}</h1>
        </h1>
        <p class="opacity-80 px-4">
          add members to your workspace to collaborate with them.
        </p>
        <v-card-text class="relative">
          <v-menu v-model="usersMenu">
            <template v-slot:activator="{ props }">
              <v-text-field v-bind="props" label="Email" placeholder="name@example.com" v-model="userToInvite">
              </v-text-field>
            </template>
            <v-list class="-mt-5">
              <v-list-item v-for="user in users" :key="index" :value="index" @click="() => userToInvite = user.email"
                :disabled="workspaceInfo.members?.some(member => member.id === user.id)">
                <UserProfile :member="user" />
                <p class="text-xs" v-if="workspaceInfo.members.some(member => member.id === user.id)">
                  Already a member in this workspace
                </p>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-row>
            <v-col cols="12" md="6">
              <v-btn color="primary" class="w-full" variant="outlined" @click="$emit('toggleModal')">Cancel</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="inviteNewUser" color="primary" class="w-full">Send</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
