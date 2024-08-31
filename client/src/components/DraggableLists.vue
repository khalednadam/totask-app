<script setup>
import { defineAsyncComponent, ref } from "vue";
import { socket } from "../composables/socket";
import { VueDraggable } from "vue-draggable-plus";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import axiosInstance from "../composables/axios";
import { useLists } from "../composables/utils";

const List = defineAsyncComponent(() => import("./List.vue"));
const props = defineProps({
  isWorkspacePremium: Boolean,
});

const isDeleteLoading = ref(false);
const route = useRoute();
const toast = useToast();
const { lists, isLoading } = await useLists(route.params.boardId);
const updateListPosition = (listId, newPosition) => {
  axiosInstance
    .put(
      `/list/${listId}`,
      {
        position: newPosition,
      },
      {
        withCredentials: true,
      }
    )
    .then(() => {
      socket.emit("update-lists", { boardId: route.params.boardId });
    })
    .catch((err) => {
      console.log(err);
    });
};

const onUpdate = (e) => {
  let index = e.newIndex;
  let prevList = lists.value[index - 1];
  let nextList = lists.value[index + 1];
  let list = lists.value[index];

  let position = list.position;

  if (prevList && nextList) {
    position = (prevList.position + nextList.position) / 2;
  } else if (prevList) {
    position = prevList.position + prevList.position / 2;
  } else if (nextList) {
    position = nextList.position / 2;
  }
  updateListPosition(e.item.id, position);
};

const deleteList = (listId) => {
  isDeleteLoading.value = true;
  axiosInstance
    .delete(`/list/${listId}`, {
      withCredentials: true,
    })
    .then(() => {
      toast.success("List was deleted");
      socket.emit("update-lists", { boardId: route.params.boardId });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isDeleteLoading.value = false;
    });
};
</script>
<template>
  <VueDraggable
    ref="el"
    group="lists"
    handle=".header"
    v-model="lists"
    :animation="150"
    ghostClass="ghost"
    class="justify-between mx-3 max-h-[90%] flex flex-1 gap-3"
    scroll
    :scrollSensitivity="300"
    @update="onUpdate"
    bubbleScroll
  >
    <template v-for="(list, index) in lists" :key="list.id">
      <List
        :is-workspace-premium="isWorkspacePremium"
        :is-delete-loading="isDeleteLoading"
        :is-list-loading="isLoading"
        :id="list.id.toString()"
        :list="list"
        @delete-list="(listId) => deleteList(listId)"
        :index="index"
        @update-index="(index) => updateListPosition(list.id, index)"
      />
    </template>
  </VueDraggable>
</template>
