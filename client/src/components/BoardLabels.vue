<script setup>
import { ref } from "vue";
import axiosInstance from "../composables/axios";
import { toastError } from "../composables/helper";
import { socket } from "../composables/socket";

const newLabelMenu = defineModel("newLabelMenu");
const boardLabels = defineModel("boardLabels");

const props = defineProps({
  cardId: String,
  boardId: String,
  listId: String,
});

const emit = defineEmits(["update-card"]);

const newLabelColor = ref();
const newLabelTitle = ref();
const addLabelLoading = ref(false);

const createLabel = () => {
  addLabelLoading.value = true;
  axiosInstance
    .post(
      `/label/create`,
      {
        title: newLabelTitle.value,
        color: newLabelColor.value,
      },
      {
        params: {
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      boardLabels.value.push(res.data);
      socket.emit("update-cards", props.boardId, [props.listId]);
      socket.emit("update-card", props.cardId);
      newLabelMenu.value = false;
      newLabelTitle.value = null;
      newLabelColor.value = null;
    })
    .catch((err) => {
      console.log(err);
      toastError(err);
    })
    .finally(() => {
      addLabelLoading.value = false;
    });
};
</script>
<template>
  <v-dialog
    v-model="newLabelMenu"
    width="350"
    class="w-max bg-red mx-auto"
    :scrim="false"
    :close-on-content-click="false"
  >
    <v-card class="mx-auto" width="350">
      <v-card-title class="text-center"> Add label </v-card-title>
      <div
        class="bg-list mb-2 h-20 w-full flex justify-center items-center px-4"
      >
        <v-btn :color="newLabelColor" variant="flat" class="w-full">
          <p v-if="newLabelTitle">
            {{ newLabelTitle.toUpperCase() }}
          </p>
        </v-btn>
      </div>
      <v-card-text>
        <v-text-field label="Title" v-model="newLabelTitle"> </v-text-field>
        <v-color-picker
          class="min-w-full"
          hide-inputs
          v-model="newLabelColor"
          hide-canvas
          show-swatches
          elevation="0"
        ></v-color-picker>
        <v-btn
          @click="createLabel"
          :disabled="!newLabelColor"
          color="primary"
          class="mt-2"
        >
          Create
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
