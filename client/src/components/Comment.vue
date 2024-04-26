<script setup>
import { Icon } from "@iconify/vue";
import UserAvatar from "./UserAvatar.vue";
import { useCurrentUser } from "../stores/auth";
import { socket } from "../composables/socket";
import { ref } from "vue";
import axiosInstance from "../composables/axios";

const currentUser = useCurrentUser();

const props = defineProps({
  comment: Object,
  boardId: String,
  cardId: String,
});

const fullDateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const textTarget = ref(null);
const isUpdate = ref(false);
const commentText = ref(props.comment.text);

const deleteComment = () => {
  axiosInstance
    .delete(`/comment/${props.comment.id}`, {
      params: {
        boardId: props.boardId,
      },
      withCredentials: true,
    })
    .then((res) => {
      socket.emit("update-cards", props.boardId, null);
      socket.emit("update-card", props.cardId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateComment = () => {
  axiosInstance
    .put(
      `/comment/${props.comment.id}`,
      {
        text: commentText.value,
        boardId: props.boardId,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      isUpdate.value = false;
      socket.emit("update-cards", props.boardId, null);
      socket.emit("update-card", props.cardId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const onClickOutside = () => {
  isUpdate.value = false;
  commentText.value = props.comment.text;
};
</script>
<template>
  <div class="flex items-start mt-2 gap-2 w-full justify-between">
    <div class="flex items-start mt-2 gap-2 w-full">
      <UserAvatar :user="comment.user" />
      <div class="flex flex-col w-full">
        {{ comment.user.name }}

        <p class="p-2 bg-list rounded-lg max-w-max" v-if="!isUpdate">
          {{ comment.text }}
        </p>
        <div v-else ref="textTarget" v-click-outside="onClickOutside">
          <v-text-field hide-details class="w-full min-w-full" v-model="commentText">
          </v-text-field>
          <div class="mt-2 flex gap-2" @click="updateComment">
            <v-btn variant="tonal" color="primary"> Save </v-btn>
            <v-btn variant="outlined" color="primary" @click="isUpdate = false">
              Cancel
            </v-btn>
          </div>
        </div>
        <div class="text-xs flex items-center" v-if="!isUpdate">
          <p>
            {{
              new Date(comment.createdAt).toLocaleString(
                "en-GB",
                fullDateOptions
              )
            }}
          </p>
          <v-btn @click="isUpdate = true" v-if="currentUser.user?.id === comment.user.id" size="small" density="compact"
            variant="text">
            edit
          </v-btn>
        </div>
      </div>
    </div>
    <div class="justify-self-end self-center" v-if="currentUser.user?.id === comment.user.id">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" icon size="small">
            <Icon icon="ph:dots-three-outline-fill" width="20" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="deleteComment" base-color="error" density="compact" :rounded="false">
            <template v-slot:prepend>
              <Icon icon="ph:trash" width="25" />
            </template>
            Delete
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
