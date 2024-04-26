<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core'
import ChangeableText from './ChangeableText.vue';
import axios from 'axios';
import { socket } from '../composables/socket';

const props = defineProps({
  checklistItem: Object,
  listId: String,
  boardId: String
})

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const title = ref(props.checklistItem.title)
const titleInput = ref(null);
const emit = defineEmits(["updateChecklistItem", "deleteChecklistItem"]);
const updateTitleField = ref(false);

const updateTitle = () => {
  emit("updateChecklistItem", title.value, props.checklistItem.isChecked);
  updateTitleField.value = false;
}

const convertToCard = () => {
  axiosInstance.post(`/card/create`, {
    board: props.boardId,
    list: props.listId,
    title: props.checklistItem.title,
  }, {
    withCredentials: true
  }).then((res) => {
    emit('deleteChecklistItem', props.checklistItem.id);
    socket.emit("update-cards", props.boardId, [props.listId])
  }).catch((err) => {
    console.log(err);
  })
}

onClickOutside(titleInput, () => updateTitleField.value = false);
</script>
<template>
  <v-list-item density="compact" class="flex items-center justify-center ">
    <template v-slot:prepend>
      <v-checkbox class="self-start" @change="$emit('updateChecklistItem', title, checklistItem.isChecked)"
        color="primary" density="compact" v-model="checklistItem.isChecked" hide-details></v-checkbox>
    </template>
    <ChangeableText v-model="title" class="w-full" @update="() => updateTitle()" />
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon variant="text" size="x-small">
          <Icon icon="ph:dots-three-outline-fill" width="20" />
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="convertToCard" density="compact" class="flex flex-row items-center" :rounded="false">
          <div class="flex items-center ">
            <Icon icon="ph:copy" width="25" />
            <p>
              Convert to card
            </p>
          </div>
        </v-list-item>
        <v-list-item @click="$emit('deleteChecklistItem', checklistItem.id)" base-color="error" density="compact"
          class="flex flex-row items-center" :rounded="false">
          <div class="flex items-center ">
            <Icon icon="ph:trash" width="25" />
            <p>
              Delete
            </p>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-list-item>
</template>
<style scoped>
:deep(.v-list-item__prepend) {
  align-self: start;
}
</style>
