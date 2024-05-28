<script setup>
import { Icon } from "@iconify/vue";
import { ref } from 'vue';

const model = defineModel();
const emits = defineEmits(["delete"])
const props = defineProps({
  name: String,
  isLoading: Boolean
})
const nameOfTheDelete = ref("");
</script>
<template>
  <v-dialog v-model="model">
    <v-card class="self-center h-full overflow-hidden" rounded="lg">
      <v-row class="max-w-[500px]">
        <v-col cols="12" lg="12" class="">
          <div class="flex justify-between items-center">
            <h1 class="px-5 py-3 text-xl">Delete Board?</h1>
            <v-btn @click="model = false" size="x-small" class="right-5" icon variant="text">
              <Icon icon="ph:x" width="25" />
            </v-btn>
          </div>
          <v-card-text>
            <p class="font-bold text-lg">
              Enter the board name "{{ name }}" to delete
            </p>
            <p>Things to know:</p>
            <ul class="decoration-dotted list-disc px-5">
              <li class="decoration-dotted">
                This is permanent and can't be undone.
              </li>
              <li>
                All the data related to this board will be permanently
                deleted
              </li>
            </ul>
            <p class="pt-5 pb-1">Enter the board name to delete it</p>
            <v-text-field density="compact" v-model="nameOfTheDelete">
            </v-text-field>
            <v-btn class="w-full" color="error" :loading="isLoading" :disabled="nameOfTheDelete !== name"
              variant="outlined" @click="$emit('delete')">delete</v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
