<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const text = defineModel();
const emit = defineEmits(["update"]);

const editMode = ref(false);
</script>
<template>
  <div>
    <p v-if="!editMode" @click="editMode = true">
      {{ text }}
    </p>
    <div v-click-outside="() => (editMode = false)" class="w-full" v-else>
      <v-text-field hide-details v-model="text"> </v-text-field>
      <div class="flex justify-end gap-2 mt-2 items-center">
        <v-btn
          variant="tonal"
          size="small"
          height="35"
          width="35"
          icon
          @click="editMode = false"
        >
          <Icon icon="ph:x" />
        </v-btn>
        <v-btn
          @click="
            () => {
              $emit('update');
              editMode = false;
            }
          "
          variant="tonal"
          :disabled="text.trim().length < 1"
        >
          Update
        </v-btn>
      </div>
    </div>
  </div>
</template>
