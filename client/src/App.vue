<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { fetchCsrfToken } from "./composables/axios";

onMounted(() => {
  (async () => {
    await fetchCsrfToken();
  })();
});
</script>

<template>
  <v-app :theme="$route.path.includes('/home') ? 'light' : ''">
    <component :is="$route.meta.layout || 'div'">
      <RouterView :key="$route.fullPath" />
    </component>
  </v-app>
</template>
