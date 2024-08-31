<script setup>
import { storeToRefs } from "pinia";
import { useCardSearchStore } from "../../stores/cardSearch";
import { Icon } from "@iconify/vue/dist/iconify.js";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useTheme } from "vuetify";

const theme = useTheme();
const cardSearch = useCardSearchStore();
const { searchAssignees, searchDate, searchLabels, isFilter } =
  storeToRefs(cardSearch);

const props = defineProps({
  boardMembers: Array,
  boardLabels: Array,
});
</script>
<template>
  <div class="mx-1">
    <v-menu :close-on-content-click="false" :close-on-back="false">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="white" variant="outlined" rounded>
          <v-badge v-if="isFilter" floating dot class="top-2 right-1 absolute">
          </v-badge>
          <template v-slot:append>
            <Icon icon="ph:caret-down" width="20" />
          </template>
          Filters
        </v-btn>
      </template>
      <v-card class="min-w-[250px]">
        <v-card-text class="space-y-5">
          <v-autocomplete
            multiple
            hide-details
            label="Members"
            v-model="searchAssignees"
            :items="boardMembers"
            item-title="name"
            item-value="id"
          >
          </v-autocomplete>
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn
                class="w-full flex text-start"
                variant="outlined"
                v-bind="props"
              >
                Labels
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-item-group
                  v-model="searchLabels"
                  multiple
                  class="space-y-2 my-2 w-96"
                >
                  <v-item
                    v-for="label in boardLabels"
                    :value="label.id"
                    v-slot="{ isSelected, toggle }"
                  >
                    <div class="flex items-center">
                      <v-btn
                        class="w-full"
                        :color="label.color"
                        @click="toggle"
                      >
                        <p v-if="label.title">
                          {{ label.title }}
                        </p>
                        <template v-slot:prepend v-if="isSelected">
                          <Icon icon="ph:check" width="20" />
                        </template>
                      </v-btn>
                    </div>
                  </v-item>
                </v-item-group>
              </v-card-text>
            </v-card>
          </v-menu>
          <VueDatePicker
            range
            inline
            class="w-full"
            menu-class-name="absolute"
            v-model="searchDate"
            :dark="theme.global.name.value === 'dark'"
          >
            <template #action-row="{ internalModelValue, selectDate }">
              <div class="action-row flex gap-1 w-full">
                <v-btn
                  class="select-button w-1/2"
                  color="primary"
                  variant="outlined"
                  @click="searchDate = []"
                >
                  Delete
                </v-btn>
                <v-btn
                  class="select-button w-1/2"
                  color="primary"
                  @click="selectDate"
                  >Select Date</v-btn
                >
              </div>
            </template>
          </VueDatePicker>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
