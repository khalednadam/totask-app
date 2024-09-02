<script setup>
import { toastError } from "@/composables/helper.js";
import axiosInstance from "@/composables/axios";
import { ref } from "vue";
import { socket } from "../composables/socket";
import { Icon } from "@iconify/vue/dist/iconify.js";
import CardCoverButton from "./CardCoverButton.vue";

const props = defineProps({
  cover: String,
  cardId: String,
  boardId: String,
  listId: String,
});

const emit = defineEmits(["update-card"]);

const isLoading = ref(false);

const deleteCardCover = () => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/card/deleteCover/${props.cardId}`,
      {},
      {
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
    <v-img
      v-bind="props"
      v-if="cover"
      :src="cover"
      cover
      height="200"
      class="flex justify-end items-end"
    >
      <div
        class="align-end gap-2 flex space-x-4 py-1 px-4 justify-end bg-gradient-to-t from-black/40 via-black/20 to-transparent"
      >
        <div class="flex justify-end gap-2 mb-1 mr-1">
          <v-tooltip text="Delete Cover" :open-delay="400">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                color="error"
                icon
                size="small"
                @click="deleteCardCover"
              >
                <Icon icon="ph:trash" width="20" />
              </v-btn>
            </template>
          </v-tooltip>
          <CardCoverButton
            :cardId="cardId"
            :boardId="boardId"
            :listId="listId"
            @update-card="(newCard) => $emit('update-card', newCard)"
            :is-list-button="false"
          />
        </div>
      </div>
    </v-img>
  </div>
</template>
