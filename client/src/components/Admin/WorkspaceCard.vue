<script setup>
import { ref } from 'vue';
import axiosInstance from '../../composables/axios';

const props = defineProps({
  workspace: Object
})
const isLoading = ref(false);
const toggleWorkspacePremium = async (val) => {
  isLoading.value = true;
  try {
    await axiosInstance.put(`/w/${props.workspace.id}`, { isPremium: val }, {
    })
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div>
    <v-card>
      <v-card-text>
        <div>
          <h3>
            {{ workspace.name }}
          </h3>
        </div>
        <div>
          <p v-if="workspace.createdBy">
            Created by: @{{ workspace.createdBy?.username }}
          </p>
          <p v-else>
          </p>
          <v-switch inset :loading="isLoading" :disabled="isLoading" @update:modelValue="(v) => toggleWorkspacePremium(v)"
            label="Premium" color="primary" v-model="workspace.isPremium"></v-switch>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>


