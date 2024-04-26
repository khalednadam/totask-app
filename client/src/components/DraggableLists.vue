<script setup>
import { defineAsyncComponent } from "vue";
import { socket } from "../composables/socket";
import { VueDraggable } from 'vue-draggable-plus'
import { useRoute } from "vue-router";
// import { useLists } from "../composables/utils";
import { useToast } from "vue-toastification";
import axiosInstance from "../composables/axios";

const lists = defineModel();


const List = defineAsyncComponent(() => import("./List.vue"))

const route = useRoute();
const toast = useToast();
// const { lists, isLoading } = await useLists(route.params.boardId)
const updateListPosition = (listId, newPosition) => {
  axiosInstance.put(`/list/${listId}`, {
    position: newPosition
  }, {
    withCredentials: true
  }).then(() => {
    socket.emit("update-lists", route.params.boardId);
  }).catch((err) => {
    console.log(err);
  })
}


const onUpdate = (e) => {
  let index = e.newIndex;
  let prevList = lists.value[index - 1];
  let nextList = lists.value[index + 1];
  let list = lists.value[index];

  let position = list.position;

  if (prevList && nextList) {
    position = (prevList.position + nextList.position) / 2;
  } else if (prevList) {
    position = prevList.position + (prevList.position / 2);
  } else if (nextList) {
    position = nextList.position / 2;
  }
  updateListPosition(e.item.id, position)
}

const deleteList = (listId) => {
  axiosInstance.delete(`/list/${listId}`, {
    withCredentials: true
  }).then(() => {
    toast.success("List was deleted");
    // lists.value = lists.value.filter((list) => list.id !== listId);
    socket.emit("update-lists", route.params.boardId);
  }).catch((err) => {
    console.log(err);
  })
}
</script>
<template>
  <div v-if='isLoading' v-for="i in 4" :key="i" class="px-5">
    <v-progress-circular color="primary" indeterminate="disable-shrink" size="50" width="5"></v-progress-circular>
  </div>
  <VueDraggable v-else ref="el" group="lists" handle=".header" v-model="lists" :animation="150" ghostClass="ghost"
    class="flex flex-shrink h-[70%] max-h-[70%] justify-between mx-3 gap-3 mb-3" scroll :scrollSensitivity="300"
    @update="onUpdate" bubbleScroll>
    <template v-for="(list, index) in lists" :key="list.id">
      <List :is-list-loading="isLoading" :id="list.id.toString()" :list="list"
        @delete-list="(listId) => deleteList(listId)" :index="index"
        @update-index="(index) => updateListPosition(list.id, index)" />
    </template>
  </VueDraggable>
</template>
