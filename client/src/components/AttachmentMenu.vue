<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref } from "vue";
import axiosInstance from "@/composables/axios";
import { socket } from "../composables/socket";
import { toastError } from "../composables/helper";

let attachments = ref([]);
const isLoading = ref(false);

const props = defineProps({
  cardId: String,
  boardId: String,
  listId: String,
});

const emit = defineEmits(["updateCard"]);

const addAttachments = () => {
  isLoading.value = true;
  // Create FormData object
  const formData = new FormData();

  // Append each file to FormData
  attachments.value.forEach((attachment) => {
    formData.append("files", attachment); // Append the file directly, assuming 'files' is the expected field name by Multer
  });
  axiosInstance
    .put(`/card/attachments/${props.cardId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((res) => {
      emit("updateCard", res.data);
      socket.emit("update-card", props.cardId);
      socket.emit("update-cards", props.boardId, [props.listId]);
      attachments.value = [];
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="w-full" variant="tonal">
        <template v-slot:prepend>
          <Icon icon="ph:paperclip" width="20" />
        </template>
        Attachments
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="w-80">
        <v-card-text>
          <v-file-input
            multiple
            v-model="attachments"
            name="attachments"
            label="Attachments"
            accept="image/*, application/pdf"
            variant="solo-filled"
          ></v-file-input>
        </v-card-text>
        <v-card-actions class="flex justify-end self-end justify-self-end">
          <v-btn
            variant="outlined"
            color="primary"
            @click="isActive.value = false"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="addAttachments"
            :disabled="isLoading"
            :loading="isLoading"
            variant="flat"
            color="primary"
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-menu>
</template>
