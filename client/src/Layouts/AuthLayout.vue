<script setup>
// IMPPORTS
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
// INITS
const router = useRouter();
const { mdAndUp } = useDisplay();

const goBack = () => router.go(-1);
</script>

<template>
  <v-row class="my-0 py-0">
    <v-col cols="12" md="5" class="w-full my-auto">
      <v-container>
        <v-btn @click="goBack" icon variant="tonal" size="small" color="primary" class="!absolute top-10">
          <Icon icon="ph:caret-left" class="text-primary" width="25" />
        </v-btn>
        <slot></slot>
      </v-container>
    </v-col>
    <v-col v-if="mdAndUp" cols="12" md="7" class="bg-primary my-auto h-full">
      <div class="w-full h-full justify-center items-center flex"></div>
    </v-col>
  </v-row>
</template>
