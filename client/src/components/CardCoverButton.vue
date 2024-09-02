<script setup>
import { toastError } from "@/composables/helper.js";
import axiosInstance from "@/composables/axios";
import { ref } from "vue";
import { socket } from "../composables/socket";
import { Icon } from "@iconify/vue/dist/iconify.js";

const cardCover = ref();

const props = defineProps({
  cover: String,
  cardId: String,
  boardId: String,
  listId: String,
  isListButton: Boolean,
});

const emit = defineEmits(["update-card"]);

const changeCoverMenu = ref(false);
const isLoading = ref(false);

const addCardCover = () => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/card/cover/${props.cardId}`,
      {
        file: cardCover.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      emit("updateCard", res.data);
      socket.emit("update-card", props.cardId);
      socket.emit("update-cards", props.boardId, [props.listId]);
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
  <div>
    <v-menu class="mx-auto -mt-48 flex justify-center items-center">
      <template v-slot:activator="{ props }">
        <v-btn
          v-if="isListButton"
          v-bind="props"
          class="w-full"
          variant="tonal"
        >
          <template v-slot:prepend>
            <Icon icon="ph:image" width="20" />
          </template>
          Cover
        </v-btn>
        <v-btn
          v-else
          v-bind="props"
          @click="changeCoverMenu = true"
          variant="flat"
          color="primary"
          size="small"
          icon
        >
          <Icon icon="ph:pencil" width="20" />
        </v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card class="w-80">
          <v-card-text>
            <v-file-input
              v-model="cardCover"
              accept="image/*"
              label="Cover"
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
              @click="addCardCover"
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
  </div>
</template>
