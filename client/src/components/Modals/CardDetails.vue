<script setup>
import { toastError } from "@/composables/helper.js";
import { Icon } from "@iconify/vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
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

// INITS
const props = defineProps({
  isDateDue: Boolean,
  isInLessThanDay: Boolean,
});
const emit = defineEmits(["closeModal", "updateCard", "deleteCard"]);
const cardDetails = useCardDetailsStore();
const { isActive, cardId } = storeToRefs(cardDetails);
const deleteDialog = ref(false);
const quill = ref("");
const text = ref("");
// set the quill text
const setText = () => {
  text.value = quill.value.getText();
};
const { card, isCardLoading } = await useCard(cardId.value);
// REFS
const changeCardTitle = ref(false);
const descriptionToChange = ref(card?.value.description);
const isCompleteToChange = ref(card.value.isComplete);
const startDateToChange = ref(null);
const cardLabels = ref(card.value.labels);
const endDateToChange = ref(null);
const titleToChange = ref(card?.value.title);
const assigneesToChange = ref(card?.value.assignees);
const toast = useToast();
const date = ref();
let attachments = ref([]);

// Dialogs and menus
const changeCardDescription = ref(false);
const datesMenu = ref(false);
const newLabelColor = ref();
const newLabelTitle = ref();
const newLabelMenu = ref(false);
const { members } = getMembersOfBoard(card?.value.board.id);
const labelToEdit = ref(null);
const editLabel = ref(false);
const newCommentText = ref("");
const cardCover = ref();
const isLoading = ref(false);
const addCommentLoading = ref(false);
const addLabelLoading = ref(false);

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

const updateCardTitle = () => {
  axiosInstance
    .put(
      `/card/title/${cardId.value}`,
      {
        title: titleToChange.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      changeCardTitle.value = false;
      card.value.title = res.data.title;
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
    })
    .catch((err) => {
      toastError(err);
    });
};

const updateCardDescription = () => {
  if (text.value.trim().length < 1) {
    changeCardDescription.value = false;
    descriptionToChange.value = null;
  }
  axiosInstance
    .put(
      `/card/description/${cardId.value}`,
      {
        description: descriptionToChange.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      changeCardDescription.value = false;
      card.value.description = res.data.description;
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
    })
    .catch((err) => {
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

const addCardCover = () => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/card/cover/${cardId.value}`,
      {
        file: cardCover.value[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const deleteCardCover = () => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/card/deleteCover/${cardId.value}`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};


const addAttachments = () => {
  isLoading.value = true;
  // Create FormData object
  const formData = new FormData();

  // Append each file to FormData
  attachments.value.forEach((attachment) => {
    formData.append("files", attachment); // Append the file directly, assuming 'files' is the expected field name by Multer
  });
  axiosInstance
    .put(`/card/attachments/${cardId.value}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((res) => {
      emit("updateCard", res.data);
      socket.emit("update-card", card.value.id);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
      attachments.value = [];
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
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

const onClickOutsideTitle = () => {
  changeCardTitle.value = false;
  updateCardTitle();
};

const onClickOutsideDescription = () => {
  changeCardDescription.value = false;
  updateCardDescription();
};

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

const updateCardLabels = () => {
  axiosInstance
    .put(
      `/card/labels/${card.value.id}`,
      {
        labels: cardLabels.value.map((label) => label.id),
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      emit("updateCard", res.data);
      cardLabels.value = res.data.labels;
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
      socket.emit("update-card", card.value.id);
    })
    .catch((err) => {
      toastError(err);
    });
};

const createLabel = () => {
  addLabelLoading.value = true;
  axiosInstance
    .post(
      `/label/create`,
      {
        title: newLabelTitle.value,
        color: newLabelColor.value,
      },
      {
        params: {
          boardId: card.value.board.id,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      card.value.board.labels.push(res.data);
      socket.emit("update-cards", card.value.board.id, [card.value.list.id]);
      socket.emit("update-card", card.value.id);
      newLabelMenu.value = false;
      newLabelTitle.value = null;
      newLabelColor.value = null;
    })
    .catch((err) => {
      toastError(err);
    }).finally(() => {
      addLabelLoading.value = false;
    })
};

const updateLabel = (labelId) => {
  axiosInstance
    .put(
      `/label/${labelId}`,
      {
        title: labelToEdit.value.title,
        color: labelToEdit.value.color,
      },
      {
        params: {
          boardId: card.value.board.id,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      editLabel.value = false;
      labelToEdit.value = null;
      socket.emit("update-cards", card.value.board.id, null);
      socket.emit("update-card", card.value.id);
    })
    .catch((err) => {
      toastError(err);
    });
};

const deleteLabel = (labelId) => {
  axiosInstance
    .delete(`/label/${labelId}`, {
      params: {
        boardId: card.value.board.id,
      },
      withCredentials: true,
    })
    .then((res) => {
      editLabel.value = false;
      labelToEdit.value = null;
      card.value.board.labels = card.value.board.labels.filter(
        (label) => label.id !== labelId
      );
      card.value.labels = card.value.labels.filter(
        (label) => label.id !== labelId
      );
      socket.emit("update-cards", card.value.board.id, null);
      socket.emit("update-card", card.value.id);
    })
    .catch((err) => {
      toastError(err);
    });
};
const openEditLabel = (label) => {
  console.log(label)
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
    await axiosInstance
      .post(
        `/comment/${card.value.id}/create`,
        {
          text: newCommentText.value,
          // user: currentUser.user.id,
          boardId: card.value.board.id,
        }
      )

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
  // socket.emit("unsubscribe", card.value.board.id)
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
const changeCoverMenu = ref(false);
</script>

<template>
  <!-- <v-card v-if="isCardLoading" class="2xl:w-[35vw] xl:w-[50vw] w-[90vw] m-auto"> -->
  <!-- <v-card-text> -->
  <!--   <div class="flex justify-center items-center w-full"> -->
  <!--     <v-progress-circular color="primary" indeterminate="disable-shrink" size="16" width="2"></v-progress-circular> -->
  <!--   </div> -->
  <!-- </v-card-text> -->
  <!-- </v-card> -->
  <v-card class="2xl:w-[35vw] xl:w-[50vw] w-full mx-auto">
    <v-hover v-slot="{ isHovering, props }" :open-delay="200">
      <v-img v-bind="props" v-if="card.cover" :src="card.cover" cover height="200">
        <v-overlay :model-value="isHovering" scrim="black" class="align-end gap-2 flex space-x-4 justify-end" contained>
          <div class="flex justify-end gap-2 mb-1 mr-1">
            <v-btn color="error" size="small" @click="deleteCardCover">
              Delete Cover
            </v-btn>
            <v-btn v-bind="props" @click="changeCoverMenu = true" variant="flat" color="primary" size="small">
              Change Cover
            </v-btn>
          </div>
        </v-overlay>
        <v-menu class="mx-auto -mt-48 flex justify-center items-center" v-model="changeCoverMenu">
          <template v-slot:default="{ isActive }">
            <v-card class="w-80">
              <v-card-text>
                <v-file-input v-model="cardCover" accept="image/*" label="Cover" variant="solo-filled"></v-file-input>
              </v-card-text>
              <v-card-actions class="flex justify-end self-end justify-self-end">
                <v-btn variant="outlined" color="primary" @click="isActive.value = false">
                  Cancel
                </v-btn>
                <v-btn @click="addCardCover" :disabled="isLoading" :loading="isLoading" variant="flat" color="primary">
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-menu>
      </v-img>
    </v-hover>
    <v-card-text>
      <div class="!flex justify-between mb-7">
        <div class="w-full">
          <div>
            <p class="font-bold text-2xl py-2" @click="changeCardTitle = true" v-if="!changeCardTitle">
              {{ card?.title }}
            </p>
            <v-text-field v-click-outside="onClickOutsideTitle" hide-details :autofocus="changeCardTitle"
              v-model="titleToChange" class="input" v-else>
            </v-text-field>
          </div>
          <p class="!text-sm ">
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
          <Labels @open-edit-label="(label) => openEditLabel(label)" :board-id="card.board.id"
            v-model:card-labels="card.labels" :list-id="card.list.id" :card-id="card.id"
            @update-card="(newCard) => updateCard(newCard)" v-model:cardLabelsCopy="cardLabels"
            v-model:newLabelMenu="newLabelMenu" :board-labels="card.board.labels" />
          <!--  -->

          <!--  Due Date -->
          <div class="pb-3 space-y-1" v-if="card?.endDate">
            <div class="flex items-center gap-1">
              <Icon icon="ph:clock" width="25" />
              Due date
            </div>
            <div class="inline-flex gap-1 items-center justify-center">
              <v-checkbox :key="card.isComplete" @change="() => updateCardIsComplete()" hide-details color="primary"
                v-model="card.isComplete"></v-checkbox>
              <DatePicker v-model="date" :is-date-as-title="true" :end-date="new Date(card?.endDate)"
                :start-date="new Date(card.startDate)" :is-complete="card.isComplete" :is-date-due="isDateDue"
                :past-day="pastDay" :is-in-less-than-day="isInLessThanDay" @select-date="() => selectDate()"
                @update-card-dates="() => updateCardDates()" @on-delete-date="() => onDeleteDate()" />
            </div>
          </div>
          <!--  -->

          <!-- Members -->
          <div class="pb-3" v-if="card?.assignees.length > 0">
            <p>Members</p>
            <div class="flex pt-2 p-1 -space-x-2 overflow-hidden">
              <v-tooltip :text="assignee.name" v-for="assignee in card?.assignees" :key="assignee.id">
                <template v-slot:activator="{ props }">
                  <UserAvatar :user="assignee" v-bind="props" />
                </template>
              </v-tooltip>
              <CardMembersInput mini :members v-model="assigneesToChange" :card-id="card.id"
                @update-card="(newCard) => updateCard(newCard)" />
            </div>
          </div>
          <!-- -->

          <!-- Description -->
          <div class="space-y-2  flex flex-col">
            <div class="">
              <div class="flex items-center gap-1">
                <Icon icon="ph:text-align-left" width="25" />
                Description
              </div>
              <v-card v-if="(!card?.description || card.description.length === 0) &&
                !changeCardDescription
              " class="mt-2" variant="tonal" @click="changeCardDescription = true">
                <v-card-text> Add a more detailed description... </v-card-text>
              </v-card>
              <div class="h-32 mt-2 my-20" v-if="changeCardDescription" v-click-outside="onClickOutsideDescription">
                <QuillEditor ref="quill" toolbar="essential" v-model:content="descriptionToChange"
                  @text-change="setText" contentType="html" theme="snow" />
                <div class="flex gap-3 justify-end mt-3">
                  <v-btn color="primary" variant="outlined" @click="() => {
                    (changeCardDescription = false),
                      (descriptionToChange = card?.description);
                  }
                    ">
                    Cancel
                  </v-btn>
                  <v-btn color="primary" @click="() => updateCardDescription()">
                    Save
                  </v-btn>
                </div>
              </div>
              <div class="pt-2 max-w-full overflow-y-auto" v-if="card?.description && !changeCardDescription"
                @click="changeCardDescription = true" v-html="card?.description"></div>
            </div>
            <!-- -->

            <!-- Attachments -->
            <div>
              <div class="flex items-center gap-1 mt-5" v-if="card.attachments && card.attachments.length > 0">
                <Icon icon="ph:paperclip" width="25" />
                Attachments
              </div>
              <div class="my-2">
                <template v-for="attachment in card.attachments">
                  <Attachment :card-id="card.id" :list-id="card.list.id" :src="attachment"
                    @update-card="(newCard) => updateCard(newCard)" />
                </template>
              </div>
            </div>
            <!-- -->

            <!-- Checklist -->
            <div>
              <Checklist v-if="card.checklist" :card-id="card.id" :list-id="card?.list.id" :board-id="card.board.id"
                class="mt-5" v-model="card.checklist" @update-card="(newCard) => updateCard(newCard)"
                @update-card-checklist="(newChecklist) => updateCardChecklist(newChecklist)
                  " />
            </div>

            <!-- Comments -->
            <div>
              <div class="flex items-center mt-6 gap-1">
                <Icon icon="ph:chat" width="25" />
                Comments
              </div>
              <template v-for="comment in card.comments" :key="comment.id">
                <Comment :board-id="card.board.id" :card-id="card.id" :comment />
              </template>
              <v-text-field @keydown.enter="addComment" v-model="newCommentText" class="mt-4" hide-details
                density="compact" placeholder="write a comment">
                <template v-slot:append>
                  <v-btn :loading="addCommentLoading" :disabled="addCommentLoading" variant="tonal" color="primary"
                    @click="addComment">
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

            <CardMembersInput :card-id="card.id" :members v-model="assigneesToChange"
              @update-card="(newCard) => updateCard(newCard)" />

            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="w-full" variant="tonal">
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
                    <v-item v-for="label in card.board.labels" :value="label" v-slot="{ isSelected, toggle }">
                      <div class="flex items-center">
                        <v-btn class="w-11/12" :color="label.color" @click="() => {
                          toggle();
                          updateCardLabels();
                        }
                          ">
                          <p v-if="label.title">
                            {{ label.title.toUpperCase() }}
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
            <AddChecklistCard :card-id="card.id" :list-id="card.list.id" :board-id="card.board.id"
              :checklist="card.checklist" @update-card="(newCard) => updateCard(newCard)" />

            <DatePicker v-model="date" :is-date-as-title="false" :end-date="new Date(card?.endDate)"
              :start-date="new Date(card.startDate)" :is-complete="card.isComplete" :is-date-due="isDateDue"
              :past-day="pastDay" :is-in-less-than-day="isInLessThanDay" @select-date="() => selectDate()"
              @update-card-dates="() => updateCardDates()" @on-delete-date="() => onDeleteDate()" />

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="w-full" variant="tonal">
                  <template v-slot:prepend>
                    <Icon icon="ph:paperclip" width="20" />
                  </template>
                  Attachments
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card class="w-80">
                  <v-card-text>
                    <v-file-input multiple v-model="attachments" name="attachments" label="Attachments"
                      accept="image/*, application/pdf" variant="solo-filled"></v-file-input>
                  </v-card-text>
                  <v-card-actions class="flex justify-end self-end justify-self-end">
                    <v-btn variant="outlined" color="primary" @click="isActive.value = false">
                      Cancel
                    </v-btn>
                    <v-btn @click="addAttachments" :disabled="isLoading" :loading="isLoading" variant="flat"
                      color="primary">
                      Upload
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-menu>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="w-full" variant="tonal">
                  <template v-slot:prepend>
                    <Icon icon="ph:image" width="20" />
                  </template>
                  Cover
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card class="w-80">
                  <v-card-text>
                    <v-file-input v-model="cardCover" accept="image/*" label="Cover"
                      variant="solo-filled"></v-file-input>
                  </v-card-text>
                  <v-card-actions class="flex justify-end self-end justify-self-end">
                    <v-btn variant="outlined" color="primary" @click="isActive.value = false">
                      Cancel
                    </v-btn>
                    <v-btn @click="addCardCover" :disabled="isLoading" :loading="isLoading" variant="flat"
                      color="primary">
                      Upload
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-menu>
            <v-divider class="bg-black opacity-100"></v-divider>
            <v-btn class="w-full" variant="tonal" color="error" @click="deleteDialog = true">
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
      <DeleteModal title="Are you sure you want to delete this card?"
        text="All progress and information in this card will be deleted" action-btn-text="Delete"
        @cancel="() => (deleteDialog = false)" @delete="() => deleteCard()" />
    </v-dialog>
  </v-card>
  <v-dialog v-model="newLabelMenu" width="350" class="w-max bg-red mx-auto" :scrim="false"
    :close-on-content-click="false">
    <v-card class="mx-auto" width="350">
      <v-card-title class="text-center"> Add label </v-card-title>
      <div class="bg-list mb-2 h-20 w-full flex justify-center items-center px-4">
        <v-btn :color="newLabelColor" variant="flat" class="w-full">
          <p v-if="newLabelTitle">
            {{ newLabelTitle.toUpperCase() }}
          </p>
        </v-btn>
      </div>
      <v-card-text>
        <v-text-field label="Title" v-model="newLabelTitle"> </v-text-field>
        <v-color-picker class="min-w-full" hide-inputs v-model="newLabelColor" hide-canvas show-swatches
          elevation="0"></v-color-picker>
        <v-btn @click="createLabel" :disabled="!newLabelColor" color="primary" class="mt-2">
          Create
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editLabel" :key="editLabel" width="350" class="w-max bg-red mx-auto">
    <v-card class="mx-auto" width="350">
      <v-card-title class="text-center">
        <div class="flex justify-between items-center">
          <p>
            Edit label
          </p>
          <v-btn size="x-small" icon @click="() => editLabel = false">
            <Icon icon="ph:x" width="25" />
          </v-btn>
        </div>
      </v-card-title>
      <div class="bg-list mb-2 h-20 w-full flex justify-center items-center px-4">
        <v-btn :color="labelToEdit.color" variant="flat" class="w-full">
          <p v-if="labelToEdit.title">
            {{ labelToEdit.title.toUpperCase() }}
          </p>
        </v-btn>
      </div>
      <v-card-text>
        <v-text-field label="Title" v-model="labelToEdit.title"> </v-text-field>
        <v-color-picker class="min-w-full" hide-inputs v-model="labelToEdit.color" hide-canvas show-swatches
          elevation="0"></v-color-picker>
        <div class="flex items-center gap-2">
          <v-btn @click="() => deleteLabel(labelToEdit.id)" color="error" class="mt-2">
            Delete
          </v-btn>
          <v-btn @click="() => updateLabel(labelToEdit.id)" :disabled="!labelToEdit.color" color="primary" class="mt-2">
            Update
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style scoped>
:deep(.ql-container) {
  font-family: "Lato", sans-serif !important;
}
</style>

<style>
@import "../../assets/override.css";
</style>
