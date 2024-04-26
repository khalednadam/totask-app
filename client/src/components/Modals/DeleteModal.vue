<script setup>
defineProps({
  title: String,
  text: String,
  actionBtnText: String,
  isLoading: Boolean
})
defineEmits(["cancel", "delete"])
</script>
<template>
  <v-card :title="title">
    <v-card-text> {{ text }} </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" text="Cancel" @click="$emit('cancel')"></v-btn>
      <v-btn :loading="isLoading" :disabled="isLoading" variant="tonal" :text="actionBtnText" color="error"
        @click="$emit('delete')"></v-btn>
    </v-card-actions>
  </v-card>
</template>
