<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useTheme } from "vuetify/lib/framework.mjs";
import FullDate from "./FullDate.vue";
const model = defineModel();
const props = defineProps({
  endDate: Date,
  startDate: Date,
  isComplete: Boolean,
  isDateDue: Boolean,
  pastDay: Boolean,
  isInLessThanDay: Boolean,
  isDateAsTitle: Boolean,
});
const emit = defineEmits(["selectDate", "updateCardDates", "onDeleteDate"]);
const dateMenu = ref(false);
const theme = useTheme();
const color = computed(() => {
  if (props.isComplete) {
    return "success";
  }
  // due more than 1 day ago
  if (props.isDateDue && props.pastDay) {
    return "error";
  }
  // recently dued
  if (props.isDateDue && !props.pastDay) {
    return "error1";
  }
  // will be due soon
  if (!props.isDateDue && props.isInLessThanDay) {
    return "alert2";
  }
  return "";
});
</script>
<template>
  <v-menu v-model="dateMenu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <div v-if="isDateAsTitle">
        <v-btn v-bind="props" variant="tonal" :color="color" :key="color">
          <FullDate :date="endDate" :include-time="true" />
        </v-btn>
      </div>
      <div v-else>
        <v-btn v-bind="props" variant="tonal" class="w-full">
          <template v-slot:prepend>
            <Icon icon="ph:clock" width="20" />
          </template>
          Dates
        </v-btn>
      </div>
    </template>

    <v-card>
      <v-card-title class="text-center"> Dates </v-card-title>
      <VueDatePicker
        range
        inline
        :dark="theme.global.name.value === 'dark'"
        v-model="model"
      >
        <template #action-row="{ internalModelValue, selectDate }">
          <div class="action-row flex gap-1 w-full">
            <v-btn
              class="select-button w-1/2"
              color="primary"
              variant="outlined"
              @click="$emit('onDeleteDate')"
            >
              Delete
            </v-btn>
            <v-btn
              class="select-button w-1/2"
              color="primary"
              @click="
                () => {
                  selectDate();
                  $emit('updateCardDates');
                  dateMenu = false;
                }
              "
              >Select Date</v-btn
            >
          </div>
        </template>
      </VueDatePicker>
    </v-card>
  </v-menu>
</template>
