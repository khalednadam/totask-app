<script setup>
import { ref } from 'vue';

const tab = ref(0);
const features = [
  {
    title: "Labels",
    description: "Create labels with colors and titles and add it to cards to visually categorize cards",
    img: "/labels.svg"
  },
  {
    title: "Checklists",
    description: "Create checklists to divide tasks into smaller parts and follow the progress of each task.",
    img: "/checklists.svg"
  },
  {
    title: "Comments",
    description: "Add comments to discuss a certin card and ask questions about it.",
    img: "/comments.svg"
  },
  {
    title: "Assingees",
    description: "Add assignees to cards to organize tasks and split the tasks between the team",
    img: "/assignees.svg"
  },
  {
    title: "Due dates",
    description: "Add dates to cards to organize your tasks and catch them before the deadline.",
    img: "/due-dates.svg"
  },
]

</script>
<template>
  <div>
    <v-tabs v-model="tab" align-tabs="center" color="primary">
      <v-tab :value="0">Labels</v-tab>
      <v-tab :value="1">Checklists</v-tab>
      <v-tab :value="2">Comments</v-tab>
      <v-tab :value="3">Assingees</v-tab>
      <v-tab :value="4">Due Dates</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item>
        <v-row class="mt-10">
          <v-col cols="12" md="6">
            <div class="h-full flex flex-col justify-center ">
              <h1>
                {{ features[tab].title }}
              </h1>
              <p class="md:w-2/3">
                {{ features[tab].description }}
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="w-full flex items-end justify-end">
              <v-img height="250" width="205" :src="features[tab].img">
              </v-img>
            </div>
          </v-col>
        </v-row>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
