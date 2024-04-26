<script setup>
// IMPORTS
import { ref, inject } from "vue";
import axios from "axios";
import { useDisplay } from "vuetify";
import axiosInstance from "../../composables/axios";

// GLOBAL
const workspaceTypes = inject("WORKSPACETYPES");

// env
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

// PROPS & EMITS
const emit = defineEmits(["toggleModal"]);

// INITS
const { mdAndUp, lgAndUp, mdAndDown } = useDisplay();

// REFS
const workspaceName = ref();
const workspaceDescription = ref();
const workspaceType = ref();

// FUNCTIONS
const createWorkspace = async () => {
  axiosInstance
    .post(
      `/w/create`,
      {
        name: workspaceName.value,
        type: workspaceType.value,
        description: workspaceDescription.value,
      },
      {
        withCredentials: true,
      }
    )
    .then(async (res) => {
      workspaceName.value = "";
      workspaceType.value = "";
      workspaceDescription.value = "";
      emit("toggleModal");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-card class="self-center h-full md:w-2/3 overflow-hidden" rounded="lg">
    <v-row class="">
      <v-col cols="12" lg="6" class="">
        <v-card-title>
          <h1 class="text-3xl">Create a new workspace</h1>
        </v-card-title>

        <p class="opacity-80 px-4">
          Enhance your efficiency by creating a centralized hub for easy access
          to all boards.
        </p>

        <v-card-text class="">
          <v-text-field v-model="workspaceName" label="Workspace name"></v-text-field>
          <v-select :items="workspaceTypes" v-model="workspaceType" label="Workspace type" variant="outlined"></v-select>
          <v-textarea v-model="workspaceDescription" label="Workspace description"></v-textarea>
          <v-btn @click="createWorkspace" color="primary" class="w-full">Create</v-btn>
        </v-card-text>
      </v-col>
      <v-col v-if="lgAndUp" cols="6" class="bg-darkPrimary"></v-col>
    </v-row>
  </v-card>
</template>
