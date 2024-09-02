<script setup>
import { toastError } from "@/composables/helper.js";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import axiosInstance from "@/composables/axios";
import { socket } from "@/composables/socket";
import { getMembersOfBoard, useCard } from "@/composables/utils";
import { useCardDetailsStore } from "@/stores/cardDetails";
import AddChecklistCard from "@/components/AddChecklistCard.vue";
import Attachment from "@/components/Attachment.vue";
import CardMembersInput from "@/components/CardMembersInput.vue";
import Checklist from "@/components/Checklist.vue";
import Comment from "@/components/Comment.vue";
import DatePicker from "@/components/DatePicker.vue";
import Labels from "@/components/Labels.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import DeleteModal from "@/components/Modals/DeleteModal.vue";
import CardCover from "../CardCover.vue";
import ChangeableText from "../ChangeableText.vue";
import CardDescription from "../CardDescription.vue";
import AttachmentMenu from "../AttachmentMenu.vue";
import CardCoverButton from "../CardCoverButton.vue";
import BoardLabels from "../BoardLabels.vue";
import EditBoardLabels from "../EditBoardLabels.vue";

// INITS
const props = defineProps({
  isDateDue: Boolean,
  isInLessThanDay: Boolean,
});
const emit = defineEmits(["closeModal", "updateCard", "deleteCard"]);
const cardDetails = useCardDetailsStore();
const { cardId } = storeToRefs(cardDetails);
const deleteDialog = ref(false);
const { card } = await useCard(cardId.value);
// REFS
const changeCardTitle = ref(false);
const isCompleteToChange = ref(card.value.isComplete);
const startDateToChange = ref(null);
const cardLabels = ref(card.value.labels);
const endDateToChange = ref(null);
const titleToChange = ref(card?.value.title);
const assigneesToChange = ref(card?.value.assignees);
const toast = useToast();
const date = ref();

// Dialogs and menus
const datesMenu = ref(false);
const newLabelMenu = ref(false);
const { members } = getMembersOfBoard(card?.value.board.id);
const labelToEdit = ref(null);
const editLabel = ref(false);
const newCommentText = ref("");
const addCommentLoading = ref(false);

// Funcitons
const updateCard = (newCard) => {
  emit("updateCard", newCard);
  card.value = newCard;
  socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
};

const updateCardChecklist = (newChecklist) => {
  card.value.checklist = newChecklist;
  emit("updateCard", card.value);
};

const updateCardIsComplete = () => {
  axiosInstance
    .put(
      `/card/isComplete/${cardId.value}`,
      {
        isComplete: card.value.isComplete,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      card.value.isComplete = res.data.isComplete;
      isCompleteToChange.value = res.data.isComplete;
      emit("updateCard", res.data);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
      socket.emit("update-card", card.value.id);
    })
    .catch((err) => {
      toastError(err);
    });
};

const updateCardTitle = (newTitle) => {
  console.log("hello");
  axiosInstance
    .put(
      `/card/title/${cardId.value}`,
      {
        title: newTitle,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      changeCardTitle.value = false;
      card.value.title = res.data.title;
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
    })
    .catch((err) => {
      console.log(err);
      toastError(err);
    });
};

const updateCardDates = () => {
  axiosInstance
    .put(
      `/card/dates/${cardId.value}`,
      {
        startDate: date.value[0],
        endDate: date.value[1],
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      datesMenu.value = false;
      card.value.startDate = date.value[0];
      card.value.endDate = date.value[1];
      startDateToChange.value = date.value[0];
      endDateToChange.value = date.value[1];
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
    })
    .catch((err) => {
      toastError(err);
    });
};

const onDeleteDate = () => {
  date.value = [null, null];
  datesMenu.value = false;
  updateCardDates();
  card.value.startDate = new Date();
  card.value.endDate = new Date();
  date.value = [new Date(), new Date()];
  isCompleteToChange.value = false;
  card.value.isComplete = false;
  startDateToChange.value = new Date();
  endDateToChange.value = new Date();
};

// computed
const timeDifference = computed(() => {
  return new Date(card?.value.endDate) - new Date();
});
const hoursDifference = computed(() => {
  return timeDifference.value / (1000 * 60 * 60);
});
const isDateDue = computed(() => {
  return new Date() > endDateToChange.value && !card.value.isComplete;
});
const isInLessThanDay = computed(() => {
  return (
    hoursDifference.value < 24 &&
    hoursDifference.value > 0 &&
    !card.value.isComplete
  );
});
const pastDay = computed(() => {
  return hoursDifference.value < -24 && !card.value.isComplete;
});

const deleteCard = () => {
  axiosInstance
    .delete(`/card/${cardId.value}`, {
      withCredentials: true,
    })
    .then(() => {
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
      toast.success("card was deleted");
      socket.emit("delete-card", cardId.value);
    })
    .catch((err) => {
      toastError(err);
    });
};

const openEditLabel = (label) => {
  editLabel.value = true;
  labelToEdit.value = label;
};

watch(editLabel, () => {
  if (!editLabel.value) {
    labelToEdit.value = null;
  }
});

const addComment = async () => {
  addCommentLoading.value = true;
  try {
    await axiosInstance.post(`/comment/${card.value.id}/create`, {
      text: newCommentText.value,
      boardId: card.value.board.id,
    });

    newCommentText.value = "";
    socket.emit("update-cards", card.value.board.id, null);
    socket.emit("update-card", card.value.id);
  } catch (err) {
    toastError(err);
  } finally {
    addCommentLoading.value = false;
  }
};

// Life cycle
onMounted(() => {
  socket.emit("subscribe", cardId.value);
  if (card?.value.endDate !== null) {
    endDateToChange.value = new Date(card?.value.endDate);
  } else {
    endDateToChange.value = new Date();
  }
  if (card?.value.startDate !== null) {
    startDateToChange.value = new Date(card?.value.startDate);
  } else {
    startDateToChange.value = new Date();
  }
  date.value = [startDateToChange.value, endDateToChange.value];
});
onUnmounted(() => {
  socket.emit("unsubscribe", card.value.id);
});
</script>

<template>
  <v-card class="2xl:w-[35vw] xl:w-[50vw] w-full mx-auto">
    <CardCover
      :cover="card.cover"
      :cardId="cardId"
      :boardId="card.board.id"
      :listId="card.list.id"
      @update-card="(newCard) => updateCard(newCard)"
    />
    <v-card-text>
      <div class="!flex justify-between mb-7">
        <div class="w-full">
          <ChangeableText
            v-if="card.title"
            v-model="titleToChange"
            @update="() => updateCardTitle(titleToChange)"
            class="input text-2xl py-2 font-bold"
          />
          <p class="!text-sm">
            in list
            <span class="underline font-bold"> {{ card.list.name }} </span>
          </p>
        </div>
        <div>
          <v-btn variant="text" icon size="27" @click="cardDetails.$reset">
            <Icon icon="ph:x" width="20" />
          </v-btn>
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="8">
          <!-- Labels -->
          <p class="mb-2">Labels</p>

          <Labels
            @open-edit-label="(label) => openEditLabel(label)"
            :board-id="card.board.id"
            v-model:card-labels="card.labels"
            :list-id="card.list.id"
            :card-id="card.id"
            @update-card="(newCard) => updateCard(newCard)"
            v-model:cardLabelsCopy="cardLabels"
            v-model:newLabelMenu="newLabelMenu"
            :board-labels="card.board.labels"
          />

          <!--  -->

          <!--  Due Date -->
          <div class="pb-3 space-y-1" v-if="card?.endDate">
            <div class="flex items-center gap-1">
              <Icon icon="ph:clock" width="25" />
              Due date
            </div>
            <div class="inline-flex gap-1 items-center justify-center">
              <v-checkbox
                :key="card.isComplete"
                @change="() => updateCardIsComplete()"
                hide-details
                color="primary"
                v-model="card.isComplete"
              ></v-checkbox>
              <DatePicker
                v-model="date"
                :is-date-as-title="true"
                :end-date="new Date(card?.endDate)"
                :start-date="new Date(card.startDate)"
                :is-complete="card.isComplete"
                :is-date-due="isDateDue"
                :past-day="pastDay"
                :is-in-less-than-day="isInLessThanDay"
                @select-date="() => selectDate()"
                @update-card-dates="() => updateCardDates()"
                @on-delete-date="() => onDeleteDate()"
              />
            </div>
          </div>
          <!--  -->

          <!-- Members -->
          <div class="pb-3" v-if="card?.assignees.length > 0">
            <p>Members</p>
            <div class="flex pt-2 p-1 -space-x-2 overflow-hidden">
              <v-tooltip
                :text="assignee.name"
                v-for="assignee in card?.assignees"
                :key="assignee.id"
              >
                <template v-slot:activator="{ props }">
                  <UserAvatar :user="assignee" v-bind="props" />
                </template>
              </v-tooltip>
              <CardMembersInput
                mini
                :members
                v-model="assigneesToChange"
                :card-id="card.id"
                @update-card="(newCard) => updateCard(newCard)"
              />
            </div>
          </div>
          <!-- -->

          <!-- Description -->
          <div class="space-y-2 flex flex-col">
            <CardDescription
              :description="card.description"
              :cardId="cardId"
              :boardId="card.board.id"
              :listId="card.list.id"
              @update-card="(newCard) => updateCard(newCard)"
            />
            <!-- -->

            <!-- Attachments -->
            <div>
              <div
                class="flex items-center gap-1 mt-5"
                v-if="card.attachments && card.attachments.length > 0"
              >
                <Icon icon="ph:paperclip" width="25" />
                Attachments
              </div>
              <div class="my-2">
                <template v-for="attachment in card.attachments">
                  <Attachment
                    :card-id="card.id"
                    :list-id="card.list.id"
                    :src="attachment"
                    @update-card="(newCard) => updateCard(newCard)"
                  />
                </template>
              </div>
            </div>
            <!-- -->

            <!-- Checklist -->
            <div>
              <Checklist
                v-if="card.checklist"
                :card-id="card.id"
                :list-id="card?.list.id"
                :board-id="card.board.id"
                class="mt-5"
                v-model="card.checklist"
                @update-card="(newCard) => updateCard(newCard)"
                @update-card-checklist="
                  (newChecklist) => updateCardChecklist(newChecklist)
                "
              />
            </div>

            <!-- Comments -->
            <div>
              <div class="flex items-center mt-6 gap-1">
                <Icon icon="ph:chat" width="25" />
                Comments
              </div>
              <template v-for="comment in card.comments" :key="comment.id">
                <Comment
                  :board-id="card.board.id"
                  :card-id="card.id"
                  :comment
                />
              </template>
              <v-text-field
                @keydown.enter="addComment"
                v-model="newCommentText"
                class="mt-4"
                hide-details
                density="compact"
                placeholder="write a comment"
              >
                <template v-slot:append>
                  <v-btn
                    :loading="addCommentLoading"
                    :disabled="addCommentLoading"
                    variant="tonal"
                    color="primary"
                    @click="addComment"
                  >
                    send
                  </v-btn>
                </template>
              </v-text-field>
            </div>
            <!-- -->
          </div>
        </v-col>

        <!------------------->
        <!-- Card Actions  -->
        <!------------------->
        <v-col cols="12" md="4">
          <div class="w-full space-y-2">
            <p class="text-md">Add to card</p>

            <CardMembersInput
              :card-id="card.id"
              :members
              v-model="assigneesToChange"
              @update-card="(newCard) => updateCard(newCard)"
            />

            <Labels
              @open-edit-label="(label) => openEditLabel(label)"
              :board-id="card.board.id"
              v-model:card-labels="card.labels"
              :list-id="card.list.id"
              :card-id="card.id"
              @update-card="(newCard) => updateCard(newCard)"
              v-model:cardLabelsCopy="cardLabels"
              v-model:newLabelMenu="newLabelMenu"
              :board-labels="card.board.labels"
              :is-button="true"
            />
            <AddChecklistCard
              :card-id="card.id"
              :list-id="card.list.id"
              :board-id="card.board.id"
              :checklist="card.checklist"
              @update-card="(newCard) => updateCard(newCard)"
            />

            <DatePicker
              v-model="date"
              :is-date-as-title="false"
              :end-date="new Date(card?.endDate)"
              :start-date="new Date(card.startDate)"
              :is-complete="card.isComplete"
              :is-date-due="isDateDue"
              :past-day="pastDay"
              :is-in-less-than-day="isInLessThanDay"
              @select-date="() => selectDate()"
              @update-card-dates="() => updateCardDates()"
              @on-delete-date="() => onDeleteDate()"
            />

            <AttachmentMenu
              :cardId="cardId"
              :boardId="card.board.id"
              :listId="card.list.id"
              @update-card="(newCard) => updateCard(newCard)"
            />

            <CardCoverButton
              :cardId="cardId"
              :boardId="card.board.id"
              :listId="card.list.id"
              @update-card="(newCard) => updateCard(newCard)"
              :is-list-button="true"
            />
            <v-divider class="bg-black opacity-100"></v-divider>
            <v-btn
              class="w-full"
              variant="tonal"
              color="error"
              @click="deleteDialog = true"
            >
              <template v-slot:prepend>
                <Icon icon="ph:trash" width="20" />
              </template>
              Delete
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <br />
    </v-card-text>
    <v-dialog width="500" v-model="deleteDialog">
      <DeleteModal
        title="Are you sure you want to delete this card?"
        text="All progress and information in this card will be deleted"
        action-btn-text="Delete"
        @cancel="() => (deleteDialog = false)"
        @delete="() => deleteCard()"
      />
    </v-dialog>
  </v-card>
  <BoardLabels
    v-model:newLabelMenu="newLabelMenu"
    v-model:boardLabels="card.board.labels"
    :cardId="cardId"
    :boardId="card.board.id"
    :listId="card.list.id"
    @update-card="(newCard) => updateCard(newCard)"
  />
  <EditBoardLabels
    v-model:editLabel="editLabel"
    v-model:boardLabels="card.board.labels"
    v-model:cardLabels="card.labels"
    v-model:labelToEdit="labelToEdit"
    :cardId="cardId"
    :boardId="card.board.id"
    :listId="card.list.id"
    @update-card="(newCard) => updateCard(newCard)"
  />
</template>

<style>
@import "../../assets/override.css";
</style>
