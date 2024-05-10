<script setup>
import { Icon } from "@iconify/vue";
import { ref, watch, defineAsyncComponent } from "vue";
import { useCardsOfList } from "../composables/utils";
import { useToast } from "vue-toastification";
import { socket } from "../composables/socket";
import { VueDraggable } from "vue-draggable-plus";
import { useCardSearchStore } from "../stores/cardSearch.js";
import { storeToRefs } from "pinia";
import axiosInstance from "../composables/axios";

const DeleteModal = defineAsyncComponent(
  () => import("./Modals/DeleteModal.vue")
);
const Card = defineAsyncComponent(() => import("./Card.vue"));

const props = defineProps({
  list: Object,
  index: Number,
  members: Array,
  isListLoading: Boolean,
  isDeleteLoading: Boolean
});

const cardSearch = useCardSearchStore();
const emits = defineEmits(["deleteList", "updateIndex"]);
const toast = useToast();

const el = ref(null);

const listName = ref(props.list?.name);
const updateName = ref("");
const showRename = ref(false);
const deleteListDialog = ref(false);
const { cards, isLoading } = useCardsOfList(props.list.id, props.list.board);
const addCardInput = ref(false);
const newCardTitle = ref("");
const { searchWord, searchAssignees, searchLabels, searchDate } =
  storeToRefs(cardSearch);
const isAddingCardLoading = ref(false);

const editName = (listName) => {
  showRename.value = true;
  updateName.value = listName;
};

const endEditName = () => {
  showRename.value = false;
  updateList();
  updateName.value = "";
};

const addCard = () => {
  isAddingCardLoading.value = true;
  axiosInstance
    .post(
      `/card/create`,
      {
        board: props.list.board,
        list: props.list.id,
        title: newCardTitle.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      socket.emit("update-cards", props.list.board, [props.list.id]);
      newCardTitle.value = "";
      cards.value.push(res.data);
      toast.success("card added");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isAddingCardLoading.value = false;
    });
};

// TODO: move this into Card.vue
const deleteCard = (cardId) => {
  axiosInstance
    .delete(`/card/${cardId}`, {
      withCredentials: true,
    })
    .then(() => {
      socket.emit("update-cards", props.list.board, [props.list.id]);
      toast.success("card was deleted");
      socket.emit("delete-card", cardId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateList = () => {
  axiosInstance
    .put(
      `/list/${props.list.id}`,
      {
        name: updateName.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      listName.value = res.data.name;
      socket.emit("update-lists", res.data.board);
    })
    .catch((err) => {
      console.log(err);
    });
};

/*
  Updates the card
  @param {String} cardId - the id of the card that will be updated
  @param {String} newListId - the list id that the card is moved to
  @param {String} oldListId - the old list id that the card is moved from
  @param {Number} newPosition - the new position that the card is moved to
*/
const updateCard = (cardId, newListId, oldListId, newPosition) => {
  axiosInstance
    .put(
      `/card/${cardId}`,
      {
        position: newPosition,
        list: newListId,
      },
      {
        params: {
          sortBy: "position:asc",
        },
        withCredentials: true,
      }
    )
    .then(() => {
      socket.emit("update-cards", props.list.board, [newListId, oldListId]);
      socket.emit("update-card", cardId);
    })
    .catch((err) => {
      console.log(err);
    });
};

const onUpdate = (e) => {
  let index = e.newIndex;
  let prevCard = cards.value[index - 1];
  let nextCard = cards.value[index + 1];
  let card = cards.value[index];

  let position = card?.position || 1024;

  if (prevCard && nextCard) {
    position = (prevCard.position + nextCard.position) / 2;
  } else if (prevCard) {
    position = prevCard.position + prevCard.position / 2;
  } else if (nextCard) {
    position = nextCard.position / 2;
  } else {
    position = 1024;
  }
  updateCard(card.id, props.list.id, card.list.id, position);
};

const onAdd = (e) => {
  let index = e.newIndex;
  let prevCard = cards.value[index - 1];
  let nextCard = cards.value[index + 1];
  let card = cards.value[index];

  let position = card?.position || 1024;

  if (prevCard && nextCard) {
    position = (prevCard.position + nextCard.position) / 2;
  } else if (prevCard) {
    position = prevCard.position + prevCard.position / 2;
  } else if (nextCard) {
    position = nextCard.position / 2;
  } else {
    position = 1024;
  }
  updateCard(card.id, props.list.id, card.list.id, position);
};

const page = ref(1);
const getCards = ({ done }) => {
  page.value++;
  const newCards = ref([]);
  axiosInstance
    .get(`/card/cardsOf/${props?.list?.id}`, {
      withCredentials: true,
      params: {
        page: page.value,
        sortBy: "position:asc",
        limit: 100,
        title: searchWord.value || " ",
        assignees: searchAssignees.value || "",
        labels: searchLabels.value || "",
        date: searchDate.value || "",
      },
    })
    .then((res) => {
      newCards.value = res.data.results;
      if (res.data.results.length > 0) {
        newCards.value.map((val) => cards.value.push(val));
        page.value++;
        done("ok");
      } else {
        done("empty");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(cards, () => {
  page.value = 1;
});
</script>
<template>
  <v-card rounded="lg" color="list" class="w-[272px] mt-3 h-max max-h-max mb-5" :id="list.id.toString()">
    <v-tooltip :text="list.name">
      <template v-slot:activator="{ props }">
        <v-card-title v-bind="props" class="flex sticky z-20 flex-row items-center justify-between header">
          <div class="flex justify-between items-center">
            <div @click="() => editName(listName)" v-if="!showRename"
              class="w-max max-w-[88%] truncate cursor-pointer text-xl py-2 px-2 m-[0.5px]">
              {{ list.name }}
            </div>
            <div v-click-outside="endEditName" v-else class="w-full">
              <v-text-field class="text-2xl input" v-model="updateName" hide-details autofocus>
              </v-text-field>
            </div>
            <v-menu rounded="lg">
              <template v-slot:activator="{ props }">
                <v-btn icon variant="text" size="30" class="bg-blue-200" v-if="!showRename" v-bind="props">
                  <Icon icon="ph:dots-three-outline-fill" />
                </v-btn>
              </template>
              <v-list rounded="lg">
                <v-list-item @click="() => (addCardInput = true)" density="compact" :rounded="false">
                  <template v-slot:prepend>
                    <Icon icon="ph:plus-circle" width="25" />
                  </template>
                  Add card
                </v-list-item>
                <v-list-item @click="deleteListDialog = true" :disabled="isDeleteLoading" :loading="isDeleteLoading"
                  base-color="error" density="compact" :rounded="false">
                  <template v-slot:prepend>
                    <Icon icon="ph:trash" width="25" />
                  </template>
                  Delete this list
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn v-if="showRename" icon variant="tonal" color="primary" size="35" class="mx-1"
              @click="() => updateList(list.id)">
              <Icon icon="ph:check" />
            </v-btn>
          </div>
        </v-card-title>
      </template>
    </v-tooltip>

    <!-- <v-card-text class="overflow-y-auto h-[100%] max-h-[100%]"> -->
    <!-- VueDraggablePlus -->
    <div class="overflow-y-auto px-2">
      <div v-if="isLoading || isListLoading">
        <template v-for="i in Math.floor(Math.random() * 3) + 1" :key="i">
          <v-skeleton-loader class="my-3" type="card-avatar"></v-skeleton-loader>
        </template>
      </div>
      <!-- <v-infinite-scroll max-height="60vh" height="max" :items="cards" :onLoad="getCards"> -->
      <!-- <template v-slot:empty> -->
      <!-- <p></p> -->
      <!-- </template> -->
      <VueDraggable ref="el" group="cards" class="space-y-3" v-model="cards" :animation="150" dragClass="drag"
        ghostClass="ghost" @update="onUpdate" scroll :scrollSensitivity="300" bubbleScroll @add="onAdd" v-if="!isLoading">
        <template v-for="card in cards" :key="card.id">
          <Card :listName="list.name" :card @delete-card="(cardId) => deleteCard(cardId)" />
        </template>
      </VueDraggable>
      <!-- </v-infinite-scroll> -->
    </div>
    <!-- </v-card-text> -->

    <div class="px-2 block z-50 mb-2" v-click-outside="() => (addCardInput = false)">
      <v-btn v-if="!addCardInput" class="w-full my-1 flex justify-start p-1" height="40" variant="text"
        @click="() => (addCardInput = true)">
        <div class="px-2">
          <Icon icon="ph:plus" width="20" />
        </div>
        <div>
          <p class="text-start text-md">Add a card</p>
        </div>
      </v-btn>
      <div v-else class="flex flex-col gap-2 px-1 pt-2 pb-2" @keypress.enter="addCard()"
        @keydown.esc="addCardInput = false">
        <v-text-field single-line autofocus v-model="newCardTitle" placeholder="Enter a title for this card" rows="2"
          no-resize hide-details>
        </v-text-field>
        <div class="gap-2 flex">
          <v-btn color="primary" :loading="isAddingCardLoading" :disabled="isAddingCardLoading" @click="() => addCard()">
            Add
          </v-btn>
          <v-btn variant="text" icon size="35" @click="() => (addCardInput = false)">
            <Icon icon="ph:x" width="25" />
          </v-btn>
        </div>
      </div>
    </div>
    <v-dialog width="500" v-model="deleteListDialog">
      <DeleteModal title="Are you sure you want to delete this list?" text="All cards in this list will be deleted"
        action-btn-text="Delete" @cancel="() => (deleteListDialog = false)"
        @delete="() => $emit('deleteList', list.id)" />
    </v-dialog>
  </v-card>
</template>

<style scoped>
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

:deep(.v-field__input) {
  font-size: 1.25rem !important;
  padding: 0.5rem !important;
  margin: 0 !important;
}
</style>
