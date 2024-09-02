<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import axiosInstance from "../composables/axios";
import { toastError } from "../composables/helper";
import { socket } from "../composables/socket";

const editLabel = defineModel("editLabel");
const labelToEdit = defineModel("labelToEdit");
const boardLabels = defineModel("boardLabels");
const cardLabels = defineModel("cardLabels");

const props = defineProps({
  cardId: String,
  boardId: String,
  listId: String,
});

const updateLabel = (labelId) => {
  axiosInstance
    .put(
      `/label/${labelId}`,
      {
        title: labelToEdit.value.title,
        color: labelToEdit.value.color,
      },
      {
        params: {
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      editLabel.value = false;
      labelToEdit.value = null;
      socket.emit("update-cards", props.boardId, null);
      socket.emit("update-card", props.cardId);
    })
    .catch((err) => {
      toastError(err);
    });
};

const deleteLabel = (labelId) => {
  axiosInstance
    .delete(`/label/${labelId}`, {
      params: {
        boardId: props.boardId,
      },
      withCredentials: true,
    })
    .then((res) => {
      editLabel.value = false;
      labelToEdit.value = null;
      boardLabels.value = boardLabels.value.filter(
        (label) => label.id !== labelId
      );
      cardLabels.value = cardLabels.value.filter(
        (label) => label.id !== labelId
      );
      socket.emit("update-cards", props.boardId, null);
      socket.emit("update-card", props.cardId);
    })
    .catch((err) => {
      toastError(err);
    });
};
</script>
<template>
  <v-dialog
    v-model="editLabel"
    :key="editLabel"
    width="350"
    class="w-max bg-red mx-auto"
  >
    <v-card class="mx-auto" width="350">
      <v-card-title class="text-center">
        <div class="flex justify-between items-center">
          <p>Edit label</p>
          <v-btn size="x-small" icon @click="() => (editLabel = false)">
            <Icon icon="ph:x" width="25" />
          </v-btn>
        </div>
      </v-card-title>
      <div
        class="bg-list mb-2 h-20 w-full flex justify-center items-center px-4"
      >
        <v-btn :color="labelToEdit.color" variant="flat" class="w-full">
          <p v-if="labelToEdit.title">
            {{ labelToEdit.title.toUpperCase() }}
          </p>
        </v-btn>
      </div>
      <v-card-text>
        <v-text-field label="Title" v-model="labelToEdit.title"> </v-text-field>
        <v-color-picker
          class="min-w-full"
          hide-inputs
          v-model="labelToEdit.color"
          hide-canvas
          show-swatches
          elevation="0"
        ></v-color-picker>
        <div class="flex items-center gap-2">
          <v-btn
            @click="() => deleteLabel(labelToEdit.id)"
            color="error"
            class="mt-2"
          >
            Delete
          </v-btn>
          <v-btn
            @click="() => updateLabel(labelToEdit.id)"
            :disabled="!labelToEdit.color"
            color="primary"
            class="mt-2"
          >
            Update
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
