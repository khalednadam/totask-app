<script setup>
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from "vue-toastification"
import { socket } from '../composables/socket';
import axiosInstance from '../composables/axios';

const props = defineProps({
  checklist: Object,
  listId: String,
  boardId: String,
  cardId: String
})
const emit = defineEmits(["addChecklist", "updateCard"])

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const checklistName = ref("");
const checklistMenu = ref(false);
const toast = useToast();


const addChecklist = async () => {
  try {
    const response = await axiosInstance.put(`/card/addChecklist/${props.cardId}`, {
      name: checklistName.value,
    },
      { withCredentials: true }
    );
    emit("updateCard", response.data);
    toast.success("checklist was added successfully");
    socket.emit("update-cards", props.boardId, [props.listId])
    socket.emit("update-card", props.cardId);
    checklistMenu.value = false;
  } catch (err) {
    console.log(err);
  }
}

const removeChecklist = async () => {
  try {
    const response = await axiosInstance.put(`/card/removeChecklist/${props.cardId}`, {

    },
      {
        withCredentials: true
      });
    emit("updateCard", response.data);
    toast.success("Checklist was removed");
    checklistMenu.value = false;
    socket.emit("update-cards", props.boardId, [props.listId])
    socket.emit("update-card", props.cardId);
  } catch (err) {
    console.log(err);
  }
}
</script>
<template>
  <v-menu v-model="checklistMenu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="w-full" variant="tonal">
        <template v-slot:prepend>
          <Icon :icon="checklist ? 'ph:x-square' : 'ph:check-square-offset'" width="20" />
        </template>
        <p>
          {{ checklist ? 'Remove Checklist' : 'Checklist' }}
        </p>
      </v-btn>
    </template>
    <v-card class="" :width="300">
      <v-card-text v-if="checklist">
        Are you sure you want to remove this checklist?
        <div class="flex gap-2 justify-end items-center">
          <v-btn @click="checklistMenu = false" variant="outlined">
            Cancel
          </v-btn>
          <v-btn color="error" variant="tonal" @click="removeChecklist">
            Remove
          </v-btn>
        </div>
      </v-card-text>
      <v-card-text v-else>
        <p class="text-center text-sm ">
          Add checklist
        </p>
        <p class="text-xs">
          Checklist title
        </p>
        <v-text-field hide-details class="my-2" v-model="checklistName">
        </v-text-field>
        <div class="flex justify-end items-center gap-2">
          <v-btn @click="checklistMenu = false" variant="outlined">
            Cancel
          </v-btn>
          <v-btn @click="addChecklist" variant="tonal">
            Add
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
