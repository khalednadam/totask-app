<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import axios from 'axios';
import { socket } from '../composables/socket';
import { toastError } from "@/composables/helper.js"

const props = defineProps({
  inDetails: Boolean,
  boardLabels: Array,
  cardId: String,
})
const emit = defineEmits(["updateCard"])
const cardLabels = defineModel();
const newLabelColor = ref();
const newLabelTitle = ref();
const editLabel = ref(false);
const newLabelMenu = ref(false);
const labelToEdit = ref(null);
const updateLabel = (labelId) => {
  axiosInstance.put(`/label/${labelId}`,
    {
      title: labelToEdit.value.title,
      color: labelToEdit.value.color
    },
    {
      params: {
        boardId: card.value.board.id,
      },
      withCredentials: true
    }).then((res) => {
      editLabel.value = false;
      labelToEdit.value = null;
      socket.emit("update-cards", card.value.board.id, null)
      socket.emit("update-card", card.value.id);
    }).catch(err => {
      console.log(err);
    })
}
const deleteLabel = (labelId) => {
  axiosInstance.delete(`/label/${labelId}`,
    {
      params: {
        boardId: card.value.board.id
      },
      withCredentials: true
    }).then((res) => {
      editLabel.value = false
      labelToEdit.value = null;
      card.value.board.labels = card.value.board.labels.filter(label => label.id !== labelId);
      card.value.labels = card.value.labels.filter(label => label.id !== labelId);
      socket.emit("update-cards", card.value.board.id, null)
      socket.emit("update-card", card.value.id);
    }).catch(err => {
      toastError(err);
    })
}
const createLabel = () => {
  axiosInstance.post(`/label/create`, {
    title: newLabelTitle.value,
    color: newLabelColor.value,
  }, {
    params: {
      boardId: card.value.board.id
    },
    withCredentials: true
  }).then((res) => {
    card.value.board.labels.push(res.data);
    socket.emit("update-cards", card.value.board.id, [card.value.list.id])
    socket.emit("update-card", card.value.id);
    newLabelMenu.value = false;
    newLabelTitle.value = null;
    newLabelColor.value = null;
  }).catch(err => {
    console.log(err);
  })
}

const updateCardLabels = () => {
  axiosInstance.put(`/card/labels/${props.cardId}`, {
    labels: cardLabels.value.map((label) => label.id)
  }, {
    withCredentials: true
  }).then((res) => {
    emit("updateCard", res.data);
    // cardLabels.value = res.data.labels
    socket.emit("update-cards", res.data.board.id, [res.data.list.id])
    socket.emit("update-card", res.data.id);
  }).catch((err) => {
    toastError(err);
  })
}
const openEditLabel = (label) => {
  editLabel.value = true
  labelToEdit.value = label
}

watch(editLabel, () => {
  if (!editLabel.value) {
    labelToEdit.value = null;
  }
})
</script>
<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" v-if="inDetails" id="labels-menu-activator" @click="labelsMenu = true" icon variant="text"
        size="small">
        <Icon icon="ph:plus" width="20" />
      </v-btn>
      <v-btn v-else v-bind="props" class="w-full" variant="tonal">
        <template v-slot:prepend>
          <icon icon="ph:tag" width="20" />
        </template>
        Labels
      </v-btn>
    </template>
    <v-card class="relative">
      <v-card-title class="text-center relative">
        Labels
      </v-card-title>
      <v-card-text>
        <v-item-group v-model="cardLabels" multiple class="space-y-2 my-2 w-96">
          <v-item v-for="label in boardLabels" :value="label" v-slot="{ isSelected, toggle }">
            <div class="flex items-center">
              <v-btn class="w-11/12" :color="label.color" @click="() => { toggle(); updateCardLabels() }">
                <p v-if="label.title">
                  {{ label.title }}
                </p>
                <template v-slot:prepend v-if="isSelected">
                  <Icon icon="ph:check" width="20" />
                </template>
              </v-btn>
              <v-btn icon variant="text" size="small" @click="() => openEditLabel(label)">
                <Icon icon="ph:pencil-simple" width="20" />
              </v-btn>
            </div>
          </v-item>
        </v-item-group>
        <v-btn @click="newLabelMenu = true" variant="tonal" class="w-full">
          Add a new label
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
