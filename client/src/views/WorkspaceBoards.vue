<script setup>
import { useRoute } from "vue-router";
import {
  useBoards,
  getWorkspace,
  useCloasedBoards,
} from "../composables/utils";
import BoardCard from "../components/BoardCard.vue";
import AddNewBoardButton from "../components/AddNewBoardButton.vue";
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import DangerDeleteModal from "@/components/Modals/DangerDeleteModal.vue";
import axiosInstance from "../composables/axios";

// INITS
const route = useRoute();
const toast = useToast();

const { boards, isLoading } = useBoards(route.params.workspaceId);
const { closedBoards, closedBoardsLoading } = useCloasedBoards(
  route.params.workspaceId
);
const { workspace } = getWorkspace(route.params.workspaceId);
const closedBoardsDialog = ref(false);
const isLoadingClosedBoard = ref(false);
const deleteDialog = ref(false);

const headers = [
  { title: "Name", value: "name" },
  { title: "Actions", key: "actions", sortable: false },
];

const deleteBoard = (boardId) => {
  isLoading.value = true;
  axiosInstance
    .delete(`/b/${boardId}`, { withCredentials: true })
    .then((res) => {
      toast.success("Deleted");
      closedBoardsDialog.value = false;
      deleteDialog.value = false;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const reopenBoard = (board) => {
  isLoadingClosedBoard.value = true;
  axiosInstance
    .put(
      `/b/${board.id}`,
      {
        workspace: board.workspace.id,
        closed: false,
      },
      { withCredentials: true }
    )
    .then((res) => {
      closedBoardsDialog.value = false;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isLoadingClosedBoard.value = false;
    });
};

const boardToDelete = ref(null);

const selectBoardToDelete = (board) => {
  boardToDelete.value = board;
  deleteDialog.value = true;
};

watch(deleteDialog, () => {
  if (!deleteDialog) boardToDelete.value = null;
});
</script>
<template>
  <div class="flex gap-2 items-center">
    <h1 class="pt-2 pb-4">
      {{ workspace?.name }}
    </h1>
    <router-link :to="`/w/settings/${workspace?._id}`">
      <v-btn icon variant="text">
        <Icon icon="ph:pencil-simple-line" width="25" />
      </v-btn>
    </router-link>
  </div>
  <v-row>
    <v-col v-if="isLoading" cols="12" md="3" v-for="i in 3" :key="i">
      <v-skeleton-loader
        class="h-[125px] overflow-hidden rounded-lg"
        rounded="lg"
        type="card"
      ></v-skeleton-loader>
    </v-col>
    <template v-else>
      <v-col
        cols="12"
        md="3"
        v-if="workspace && workspace.isAdmin"
        :key="workspace"
      >
        <AddNewBoardButton
          :is-card="true"
          :workspace="workspace?.id"
          :key="workspace"
          @click="() => {}"
          :members="workspace.members"
          :boards="boards"
        />
      </v-col>
      <v-col cols="12" md="3" v-for="board in boards" :key="board.id">
        <BoardCard :board="board" />
      </v-col>
    </template>
  </v-row>
  <v-btn class="mt-5" @click="closedBoardsDialog = true">
    View closed boards
  </v-btn>
  <v-dialog width="500" v-model="closedBoardsDialog">
    <v-card>
      <v-card-text>
        <v-data-table :headers="headers" :items="closedBoards">
          <template v-slot:item.exclusive="{ item }"> </template>
          <template v-slot:item.actions="{ item }">
            <div class="space-x-2">
              <v-btn
                color="error"
                variant="flat"
                @click="() => selectBoardToDelete(item)"
              >
                <Icon icon="ph:x" />
                Delete
              </v-btn>
              <v-btn
                @click="() => reopenBoard(item)"
                color="primary"
                variant="flat"
              >
                Reopen
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
  <DangerDeleteModal
    :name="boardToDelete?.name"
    :isLoading="closedBoardsLoading"
    v-model="deleteDialog"
    @delete="() => deleteBoard(boardToDelete.id)"
  />
</template>
