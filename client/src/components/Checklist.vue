<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import ChecklistItem from "./ChecklistItem.vue";
import { useToast } from "vue-toastification";
import ChangeableText from "./ChangeableText.vue";
import { computed } from "vue";
import { socket } from "../composables/socket";
import axiosInstance from "../composables/axios";

const checklist = defineModel();

const el = ref(null);
const props = defineProps({
  boardId: String,
  cardId: String,
  listId: String,
});

const emit = defineEmits(["updateCardChecklist", "updateCard"]);

const toast = useToast();

const newItemTitle = ref("");
const newItemField = ref(false);
const checklistName = ref(checklist.value.name);
const precentage = computed(() =>
  Math.floor(
    (checklist.value.checkedItemsCount /
      checklist.value.checklistItems?.length || 0) * 100
  )
);

const updateChecklistItem = async (
  checklistItemId,
  itemTitle,
  itemIsChecked
) => {
  if (itemTitle.trim().length < 1) return;
  try {
    const response = await axiosInstance.put(
      `/checklist/item/${checklistItemId}`,
      {
        title: itemTitle,
        isChecked: itemIsChecked,
        checklistId: checklist.value.id,
      },
      {
        params: {
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    );
    emit("updateCardChecklist", response.data);
    socket.emit("update-cards", props.boardId, [props.listId]);
    socket.emit("update-card", props.cardId);
  } catch (err) {
    console.log(err);
  }
};

const updateChecklistItemPosition = async (checklistItemId, position) => {
  try {
    const response = await axiosInstance.put(
      `/checklist/item/${checklistItemId}`,
      {
        checklistId: checklist.value.id,
        position: position,
      },
      {
        params: {
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    );
    // emit("updateCardChecklist", response.data);
    socket.emit("update-cards", props.boardId, [props.listId]);
    socket.emit("update-card", props.cardId);
  } catch (err) {
    console.log(err);
  }
};
const addChecklistItem = async () => {
  if (newItemTitle.value.trim().length < 1) return;
  try {
    const response = await axiosInstance.post(
      `/checklist/item/${checklist.value.id}`,
      {
        title: newItemTitle.value,
      },
      {
        params: {
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    );
    emit("updateCardChecklist", response.data);
    socket.emit("update-cards", props.boardId, [props.listId]);
    socket.emit("update-card", props.cardId);
    newItemTitle.value = "";
  } catch (err) {
    console.log(err);
  }
};

const deleteChecklistItem = async (checklistItemId) => {
  try {
    const response = await axiosInstance.delete(
      `/checklist/item/${checklistItemId}`,
      {
        params: {
          checklistId: checklist.value.id,
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    );
    emit("updateCardChecklist", response.data);
    socket.emit("update-cards", props.boardId, [props.listId]);
    socket.emit("update-card", props.cardId);
    // checklist.value = response.data
  } catch (err) {
    console.log(err);
  }
};

const removeChecklist = async () => {
  try {
    const response = await axiosInstance.put(
      `/card/removeChecklist/${props.cardId}`,
      {},
      {
        withCredentials: true,
      }
    );
    emit("updateCard", response.data);
    socket.emit("update-card", props.cardId);
    socket.emit("update-cards", props.boardId, [props.listId]);
    toast.success("Checklist was removed");
  } catch (err) {
    console.log(err);
  }
};

const updateChecklist = async () => {
  try {
    const response = await axiosInstance.put(
      `api/checklist/${checklist.value.id}`,
      {
        name: checklistName.value,
      },
      {
        params: {
          boardId: props.boardId,
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const onUpdate = (e) => {
  let index = e.newIndex;
  let prevItem = checklist.value.checklistItems[index - 1];
  let nextItem = checklist.value.checklistItems[index + 1];
  let list = checklist.value.checklistItems[index];

  let position = list.position;

  if (prevItem && nextItem) {
    position = (prevItem.position + nextItem.position) / 2;
  } else if (prevItem) {
    position = prevItem.position + prevItem.position / 2;
  } else if (nextItem) {
    position = nextItem.position / 2;
  }
  updateChecklistItemPosition(e.item.id, position);
};
</script>
<template>
  <div class="">
    <div class="flex justify-between items-center">
      <div class="flex items-start w-full gap-2">
        <Icon icon="ph:check-square-offset" width="25" />
        <ChangeableText
          v-model="checklistName"
          class="w-full"
          @update="() => updateChecklist()"
        />
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon variant="text" size="x-small">
            <Icon icon="ph:dots-three-outline-fill" width="20" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="removeChecklist"
            base-color="error"
            density="compact"
            class="flex flex-row items-center"
            :rounded="false"
          >
            <div class="flex items-center">
              <Icon icon="ph:trash" width="25" />
              <p>Delete</p>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="flex items-center justify-start mt-2 w-full">
      <p class="w-9 text-xs">{{ precentage }}%</p>
      <v-progress-linear
        :title="precentage"
        :color="precentage < 100 ? '' : 'primary'"
        :model-value="precentage"
        class="max-w-[90%] -ml-5"
        height="7"
        rounded
      >
      </v-progress-linear>
    </div>
    <v-list density="compact">
      <VueDraggable
        ref="el"
        group="items"
        class="space-y-3"
        v-model="checklist.checklistItems"
        :animation="150"
        dragClass="drag"
        ghostClass="ghost"
        @update="onUpdate"
        scroll
        :scrollSensitivity="300"
        bubbleScroll
      >
        <template
          v-for="checklistItem in checklist.checklistItems"
          :key="checklistItem.id"
        >
          <ChecklistItem
            :list-id="listId"
            :board-id="boardId"
            :id="checklistItem.id.toString()"
            :checklistItem
            @delete-checklist-item="
              (checklistItemId) => deleteChecklistItem(checklistItemId)
            "
            @update-checklist-item="
              (itemTitle, itemIsChecked) =>
                updateChecklistItem(checklistItem.id, itemTitle, itemIsChecked)
            "
          />
        </template>
      </VueDraggable>
    </v-list>
    <v-btn
      v-if="!newItemField"
      @click="newItemField = true"
      class="ml-5"
      variant="tonal"
    >
      Add an item
    </v-btn>
    <div v-click-outside="() => (newItemField = false)" v-else class="ml-5">
      <v-text-field
        autofocus
        @keydown.enter="addChecklistItem"
        @keydown.esc="newItemField = false"
        density="compact"
        v-model="newItemTitle"
        class="text-xs"
        placeholder="Add an item"
      ></v-text-field>
      <div class="flex flex-row gap-2 justify-end items-center">
        <v-btn
          @click="addChecklistItem"
          variant="tonal"
          :disabled="newItemTitle.trim().length < 1"
        >
          Add
        </v-btn>
        <v-btn
          variant="tonal"
          size="small"
          height="35"
          width="35"
          icon
          @click="newItemField = false"
        >
          <Icon icon="ph:x" />
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped>
:deep(.v-field__input) {
  @apply font-normal text-sm !important;
}

:deep(.v-list-item__content) {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
}

:deep(.ghost > *) {
  background: rgba(0, 0, 0, 0) !important;
  border-radius: 8px;
  visibility: hidden;
}

:deep(.ghost) {
  opacity: 0.3;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
