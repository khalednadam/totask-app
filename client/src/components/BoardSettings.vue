<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { socket } from "../composables/socket";
import DeleteModal from "./Modals/DeleteModal.vue";
import axiosInstance from "../composables/axios";
import { toastError } from "@/composables/helper.js";

const props = defineProps({
  board: Object,
  workspaceAllMembers: Array
})

const boardSettingsDialog = defineModel();

const emit = defineEmits(["success"])

const deleteBoardDialog = ref(false);
const route = useRoute();
const newName = ref(props.board.name);
const newDescription = ref(props.board.description);
const newBackgroundColor = ref(props.board.backgroundColor);
const newIsPrivate = ref(props.board.isPrivate);
const newMembers = ref(props.board.members);
const nameOfBoardToDelete = ref("");
const router = useRouter();
const closeBoardDialog = ref(false);
const isLoading = ref(false);

const closeBoard = () => {
  isLoading.value = true;
  axiosInstance.put(`/b/${route.params.boardId}`,
    {
      workspace: props.board.workspace.id,
      closed: true
    }
    ,
    { withCredentials: true }).then((res) => {
      emit("success");
      socket.emit("change-board-info", props.board.id)
      router.go(`/workspace/${props.board.workspace.id}`);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      isLoading.value = false;
    })
}

const updateBoard = () => {
  isLoading.value = true;
  axiosInstance.put(`/b/${route.params.boardId}`,
    {
      name: newName.value,
      description: newDescription.value,
      backgroundColor: newBackgroundColor.value,
      isPrivate: newIsPrivate.value,
      members: newMembers.value || [],
      workspace: props.board.workspace.id
    }
    ,
    { withCredentials: true }).then((res) => {
      emit("success")
      socket.emit("change-board-info", props.board.id)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      isLoading.value = false;
    })
}

const deleteBoard = () => {
  isLoading.value = true;
  axiosInstance.delete(`/b/${route.params.boardId}`,
    { withCredentials: true }).then((res) => {
      emit("success")
      socket.emit("change-board-info", props.board.id)
      router.push("/")
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      isLoading.value = false;
    })
}

</script>

<template>
  <div class="w-full flex items-center ">
    <h2 class="text-xl text-center w-full">
      Board Settings
    </h2>
    <v-btn variant="text" class="justify-self-end " icon size="35" @click="() => boardSettingsDialog = false">
      <Icon icon="ph:x"></Icon>
    </v-btn>
  </div>
  <v-divider></v-divider>
  <div class="px-4 pt-5">
    <v-text-field v-model="newName" label="Board name"></v-text-field>
    <v-textarea v-model="newDescription" label="Board description"></v-textarea>

    <p>Background color</p>
    <div class="w-full">
      <v-color-picker class="min-w-full" v-model="newBackgroundColor" hide-canvas :modes="['rgb', 'hsl', 'hex']"
        show-swatches></v-color-picker>
    </div>
    <v-radio-group v-model="newIsPrivate">
      <v-radio label="Public" :value="false" class="py-2">
        <template #label>
          <div>
            <h3 class="text-xl font-bold">Public</h3>
            <p>
              All members in the workspace can view this board and
              contribute to it
            </p>
          </div>
        </template></v-radio>
      <v-radio label="Private" :value="true" class="py-2">
        <template #label>
          <div>
            <h3 class="text-xl font-bold">Private</h3>
            <p>
              Only members added to the board can view this board and
              contribute to it
            </p>
          </div>
        </template>
      </v-radio>
    </v-radio-group>

    <v-select v-model="newMembers" :items="workspaceAllMembers" multiple v-if="newIsPrivate" label="members"
      item-title="name" item-value="id">
    </v-select>
    <div class="flex flex-row justify-end gap-5">
      <v-btn color="primary" @click="updateBoard">Update</v-btn>
    </div>
    <v-divider class="py-2" />
    <div>
      <v-btn color="error" @click="closeBoardDialog = true">
        Close board
      </v-btn>
    </div>
    <div class="py-2">
      <v-btn color="error" @click="deleteBoardDialog = true">
        Delete board
      </v-btn>
    </div>
  </div>
  <v-dialog v-model="deleteBoardDialog">
    <v-card class="self-center h-full overflow-hidden" rounded="lg">
      <v-row class="max-w-[500px]">
        <v-col cols="12" lg="12" class="">
          <div class="flex justify-between items-center">
            <h1 class="px-5 py-3 text-xl">Delete Board?</h1>
            <v-btn @click="() => (deleteBoardDialog = false)" size="x-small" class="right-5" icon variant="text">
              <Icon icon="ph:x" width="25" />
            </v-btn>
          </div>
          <v-card-text>
            <p class="font-bold text-lg">
              Enter the board name "{{ board.name }}" to delete
            </p>
            <p>Things to know:</p>
            <ul class="decoration-dotted list-disc px-5">
              <li class="decoration-dotted">
                This is permanent and can't be undone.
              </li>
              <li>
                All the data related to this board will be permanently
                deleted
              </li>
            </ul>
            <p class="pt-5 pb-1">Enter the board name to delete it</p>
            <v-text-field density="compact" v-model="nameOfBoardToDelete">
            </v-text-field>
            <v-btn class="w-full" color="error" :disabled="nameOfBoardToDelete !== board.name" variant="outlined"
              @click="deleteBoard">delete</v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  <v-dialog v-model="closeBoardDialog" width="500">
    <DeleteModal title="Are you sure you want to close this board?"
      text="After closing this board you will not be able to modify it." action-btn-text="Close"
      @delete="() => closeBoard()" @cancel="() => closeBoardDialog = false" />
  </v-dialog>
</template>
