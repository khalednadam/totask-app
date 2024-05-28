<script setup>
// IMPPORTS
import { useDisplay } from "vuetify";
// INITS
const { mdAndUp } = useDisplay();

</script>

<template>
  <v-row class="my-0 py-0">
    <v-col cols="12" md="5" class="w-full my-auto">
      <v-container>
        <slot></slot>
      </v-container>
    </v-col>
    <v-col v-if="mdAndUp" cols="12" md="7" class="bg-primary my-auto h-full">
      <div class="w-full h-full justify-center items-center flex"></div>
    </v-col>
  </v-row>
</template>
