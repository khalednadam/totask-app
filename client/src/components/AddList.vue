<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { ref } from "vue";
import axiosInstance from "../composables/axios";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();
const toast = useToast();

const showAddList = ref(false);
const newListName = ref("");
const isAddingListLoading = ref(false);

const addList = () => {
  isAddingListLoading.value = true;
  axiosInstance
    .post(
      `/list/create`,
      {
        board: route.params.boardId,
        name: newListName.value,
      },
      {
        withCredentials: true,
      }
    )
    .then(() => {
      newListName.value = "";
      toast.success("List created");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isAddingListLoading.value = false;
    });
};
</script>
<template>
  <div class="min-w-[350px]">
    <v-btn
      text="Add a new list"
      color="list"
      class="flex w-[272px] font-bold justify-start text-start rounded"
      height="60"
      rounded="lg"
      v-if="!showAddList"
      @click="() => (showAddList = true)"
      variant="flat"
      elevation="1"
    >
      <template v-slot:prepend>
        <Icon icon="ph:plus" class=""></Icon>
      </template>
    </v-btn>
    <v-card
      color="list"
      rounded="lg"
      class="w-[272px]"
      v-else
      v-click-outside="() => (showAddList = false)"
      @keypress.enter="addList()"
      @keydown.esc="showAddList = false"
    >
      <div class="px-2 py-2">
        <v-text-field
          autofocus
          placeholder="List name"
          hide-details
          v-model="newListName"
        >
        </v-text-field>
        <div class="space-x-2 mt-3">
          <v-btn
            color="primary"
            class=""
            :disabled="newListName.length === 0 || isAddingListLoading"
            :loading="isAddingListLoading"
            @click="() => addList()"
          >
            Add list
          </v-btn>
          <v-btn
            variant="text"
            class=""
            icon
            size="35"
            @click="() => (showAddList = false)"
          >
            <Icon icon="ph:x"></Icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
