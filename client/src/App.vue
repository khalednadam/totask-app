<script setup>
import { RouterView } from "vue-router";
import { useTheme } from "vuetify";
import { onMounted } from "vue";
import { fetchCsrfToken } from "./composables/axios";

// Use an IIFE to call the async function
onMounted(() => {
  (async () => {
    await fetchCsrfToken();
  })();
});
const theme = useTheme();
</script>

<template>
  <v-app :theme="$route.path.includes('/home') ? 'light' : theme.current.value">
    <component :is="$route.meta.layout || 'div'">
      <RouterView :key="$route.fullPath" />
    </component>
  </v-app>
</template>
