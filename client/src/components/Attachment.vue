<script setup>
import axiosInstance from "@/composables/axios";
import { socket } from "@/composables/socket";
import FullDate from "./FullDate.vue";

const props = defineProps({
  src: String,
  cardId: String,
  listId: String,
});

const emit = defineEmits(["updateCard"]);

const encodedURL = props.src
  .replace("https://", "http://")
  .replace(/[ +#]/g, (match) => {
    return "%" + match.charCodeAt(0).toString(16).toUpperCase();
  });

const filename = props.src.slice(96);

const deleteAttachment = () => {
  axiosInstance
    .put(
      `/card/deleteAttachment/${props.cardId}`,
      {
        attachmentToDelete: props.src,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      emit("updateCard", res.data);
      socket.emit("update-card", props.cardId);
      socket.emit("update-cards", props.cardId, [props.listId]);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-row>
    <v-col cols="4">
      <v-img :src rounded="lg"> </v-img>
      <div v-if="src.slice(-3) === 'pdf'" class="h-24">
        <a :href="`${encodedURL}`">
          <v-avatar
            color="primary"
            rounded="lg"
            size="100%"
            class="w-full bg-red"
          >
            PDF
          </v-avatar>
        </a>
      </div>
    </v-col>
    <v-col cols="8">
      <p class="font-bold">
        {{ filename }}
      </p>
      <div class="text-xs flex gap-1">
        At
        <FullDate :date="Date(src.slice(38))" :include-time="true" />
      </div>

      <div class="flex gap-1 justify-start items-center">
        <p class="text-xs cursor-pointer underline">
          <a :href="`${encodedURL}`" rel="external" target="_blank"> View </a>
        </p>
        <p class="text-xs underline cursor-pointer" @click="deleteAttachment">
          Delete
        </p>
      </div>
    </v-col>
  </v-row>
</template>
