<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const props = defineProps({
  label: Object,
  isInCard: Boolean,
  inMenu: Boolean,
})
const emit = defineEmits(["updateCardLabels"])

const isInCard = ref(props.isInCard);

</script>
<template>
  <div class="w-full flex items-center gap-2">
    <v-checkbox @update="$emit('updateCardLabels', label.id)" v-model="isInCard" hide-details color="primary">
    </v-checkbox>
    <v-btn @click="$emit('updateCardLabels', label.id)" variant="flat" :width="200" :color="label.color">
      <p v-if="label.title">
        {{ label.title.toUpperCase() }}
      </p>
    </v-btn>
    <v-btn variant="text" icon size="small">
      <Icon icon="ph:pencil-simple" width="20" />
    </v-btn>
  </div>
</template>
