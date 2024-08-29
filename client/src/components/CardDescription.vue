<script setup>
import { toastError } from "@/composables/helper.js";
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import axiosInstance from "../composables/axios";
import { socket } from "../composables/socket";
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps({
  description: String,
  cardId: String,
  boardId: String,
  listId: String,
});
const emit = defineEmits("updateCard");

const quill = ref("");
const text = ref("");
const changeCardDescription = ref(false);
const descriptionToChange = ref(props.description);

// set the quill text
const setText = () => {
  text.value = quill.value.getText();
};

const onClickOutsideDescription = () => {
  changeCardDescription.value = false;
  updateCardDescription();
};

const updateCardDescription = () => {
  if (text.value.trim().length < 1) {
    changeCardDescription.value = false;
    descriptionToChange.value = null;
  }
  axiosInstance
    .put(
      `/card/description/${props.cardId}`,
      {
        description: descriptionToChange.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      changeCardDescription.value = false;
      // card.value.description = res.data.description;
      emit("updateCard", res.data);
      socket.emit("update-card", props.cardId);
      socket.emit("update-cards", props.boardId, [props.listId]);
    })
    .catch((err) => {
      toastError(err);
    });
};
</script>
<template>
  <div>
    <div class="">
      <div class="flex items-center gap-1">
        <Icon icon="ph:text-align-left" width="25" />
        Description
      </div>
      <v-card
        v-if="
          (!description || description.length === 0) && !changeCardDescription
        "
        class="mt-2"
        variant="tonal"
        @click="changeCardDescription = true"
      >
        <v-card-text> Add a more detailed description... </v-card-text>
      </v-card>
      <div
        class="h-32 mt-2 my-20"
        v-if="changeCardDescription"
        v-click-outside="onClickOutsideDescription"
      >
        <QuillEditor
          ref="quill"
          toolbar="essential"
          v-model:content="descriptionToChange"
          @text-change="setText"
          contentType="html"
          theme="snow"
        />
        <div class="flex gap-3 justify-end mt-3">
          <v-btn
            color="primary"
            variant="outlined"
            @click="
              () => {
                (changeCardDescription = false),
                  (descriptionToChange = description);
              }
            "
          >
            Cancel
          </v-btn>
          <v-btn color="primary" @click="() => updateCardDescription()">
            Save
          </v-btn>
        </div>
      </div>
      <div
        class="pt-2 max-w-full overflow-y-auto description"
        v-if="description && !changeCardDescription"
        @click="changeCardDescription = true"
        v-html="descriptionToChange"
      ></div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ql-container) {
  font-family: "degular-text", sans-serif !important;
}

:deep(.description ul) {
  list-style: disc !important;
  padding: 20px;
}

:deep(.description li) {
  list-style: disc !important;
}

:deep(.description a) {
  text-decoration: underline;
  color: blue;
}
</style>
