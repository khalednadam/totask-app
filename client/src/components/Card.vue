<script setup>
import DeleteModal from "@/components/Modals/DeleteModal.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import axiosInstance from "@/composables/axios";
import { toastError } from "@/composables/helper.js";
import { socket } from "@/composables/socket";
import { useCardDetailsStore } from "@/stores/cardDetails";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import "../assets/override.css";

const props = defineProps({
  card: Object,
  listName: String,
  members: Array
})


const cardDetails = useCardDetailsStore();
const { isActive, cardId } = storeToRefs(cardDetails);
const toast = useToast();

const emits = defineEmits(["deleteCard"])
const chipOptions = { year: 'numeric', month: 'short', day: 'numeric', };

const date = ref();

const deleteCardDialog = ref(false);
const card = ref(props.card)
const startDateToChange = ref(null);
const endDateToChange = ref(null);

// computed
const timeDifference = computed(() => {
  return new Date(card.value.endDate) - new Date();
})
const hoursDifference = computed(() => {
  return timeDifference.value / (1000 * 60 * 60);
})
const isDateDue = computed(() => {
  return (new Date() > new Date(card.value.endDate) && !card.value.isComplete);
})
const isInLessThanDay = computed(() => {
  return (hoursDifference.value < 24 && hoursDifference.value > 0) && !card.value.isComplete;
})
const pastDay = computed(() => {
  return (hoursDifference.value < -24) && !card.value.isComplete;
})
const color = computed(() => {
  if (card.value.isComplete) {
    return 'success';
  }
  // due more than 1 day ago
  if (isDateDue.value && pastDay.value) {
    return 'error';
  }
  // recently dued
  if (isDateDue.value && !pastDay.value) {
    return 'error1';
  }
  // will be due soon
  if (!isDateDue.value && isInLessThanDay.value) {
    return 'alert2';
  }
  return '';
})

const tip = computed(() => {
  // due more than 1 day ago
  if (card.value.isComplete) {
    return 'This card is complete'
  }
  if (isDateDue.value && pastDay.value) {
    return 'This card is past due';
  }
  // recently dued
  if (isDateDue.value && !pastDay.value) {
    return 'This card is recently overdue';
  }
  // will be due soon
  if (!isDateDue.value && isInLessThanDay.value) {
    return 'This card is due in less than twenty-four hours';
  }
  return 'This card is due later';
})
const updateCard = (newCard) => {
  card.value = newCard;
  socket.emit('update-card', card.value.id);
}
onMounted(() => {
  if (props.card.startDate === null) {
    endDateToChange.value = new Date();
  }
  if (props.card.endDate === null) {
    startDateToChange.value = new Date();
  }
  date.value = [startDateToChange.value, endDateToChange.value];
})

const activateDetails = () => {
  cardId.value = card.value.id;
  isActive.value = true;
}

const copyCard = () => {
  axiosInstance.post(`/card/create`, {
    board: props.card.board,
    list: props.card.list.id,
    description: props.card.description,
    startDate: props.card.startDate,
    endDate: props.card.endDate,
    isComplete: props.card.isComplete,
    labels: props.card.labels.map(label => label.id),
    assignees: props.card.assignees.map(assignee => assignee.id),
    title: props.card.title,
    cover: props.card.cover,
    attachments: props.card.attachments
  }, {
    withCredentials: true
  }).then((res) => {
    socket.emit("update-cards", card.value.board, [props.card.list.id])
    toast.success("card copied");
  }).catch((err) => {
    toastError(err);
  })
}

</script>

<template>
  <div class="relative">
    <v-card class="my-1" @click="activateDetails" :ripple="false" :key="props.worksapceMembers">
      <v-img v-if="card.cover" :src="card.cover" class="" cover height="90"></v-img>
      <v-card-title>
        <div v-if="card.labels && card.labels.length >= 1" class="flex gap-2 items-center flex-wrap">
          <div v-for="label in card.labels " class="h-2 w-10 rounded " :style="{ backgroundColor: label.color }">
          </div>
        </div>
        <div class="flex justify-between items-center">
          <v-tooltip :text="card.title" v-if="card.title.length > 10">
            <template v-slot:activator="{ props }">
              <p v-bind="props" class="!text-md max-w-[88%] truncate">
                {{ card.title }}
              </p>
            </template>
          </v-tooltip>
          <p v-else class="!text-md max-w-[88%] truncate">
            {{ card.title }}
          </p>
        </div>
      </v-card-title>
      <v-card-text :key="card">
        <div class="flex items-center gap-2">
          <Icon v-if="card.description" icon="ph:text-align-left" width="20" />
          <div class="flex items-center gap-1" v-if="card.comments.length > 0">
            <Icon icon="ph:chat" width="20" />
            {{ card.comments.length }}
          </div>
          <div class="inline-flex items-center gap-1" v-if="card.checklist">
            <Icon icon="ph:list-checks" width="20" />
            <p>
              {{ card.checklist.checkedItemsCount }} / {{ card.checklist.checklistItems?.length || 0 }}
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div v-if="card.assignees.length > 0" class="flex pt-3 p-1 -space-x-2 overflow-hidden">
            <UserAvatar v-for="   assignee in card.assignees   " :key="assignee.id" :user="assignee" />
          </div>
          <div class="flex gap-3 items-center">
            <div class="inline-flex items-center gap-1" v-if="card.attachments.length > 0">
              <Icon icon="ph:paperclip" width="20" />
              <p>
                {{ card.attachments.length }}
              </p>
            </div>
          </div>
          <div :key="endDateToChange" v-if="card.endDate">
            <v-tooltip :text="tip" :key="color">
              <template v-slot:activator="{ props }">
                <v-chip :key="isDateDue || card.endDate" v-bind="props" size="small" :color="color" rounded="lg">
                  <p class="text-xs">
                    {{ new Date(card.endDate)?.toLocaleString("en-GB", chipOptions) || null }}
                  </p>
                </v-chip>
              </template>
            </v-tooltip>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <div class="bg-card">
      <v-menu rounded="lg">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon size="35" class="!absolute right-2  top-2" @click="() => { }" variant="text">
            <Icon icon="ph:dots-three-outline-fill" width="20" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="copyCard">
            <template #prepend>
              <Icon icon="ph:copy" width="20" />
            </template>
            Copy card
          </v-list-item>
          <v-list-item base-color="error" @click="deleteCardDialog = true">
            <template #prepend>
              <Icon icon="ph:trash" width="20" />
            </template>
            Delete card
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
  <v-dialog width="500" v-model="deleteCardDialog">
    <DeleteModal title="Are you sure you want to delete this card?" action-btn-text="Delete"
      text="All progress and information in this card will be deleted" @cancel="() => deleteCardDialog = false"
      @delete="() => $emit('deleteCard', card.id)" />
  </v-dialog>
</template>

<style scoped>
:deep(.ql-container) {
  font-family: "Lato", sans-serif !important;
}

.ghost>* {
  background: rgba(0, 0, 0, 0.3) !important;
  border-radius: 8px;
  visibility: hidden;
}

.ghost {
  opacity: 0.3;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
