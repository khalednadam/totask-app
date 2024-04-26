<script setup>
// IMPORTS
import { ref, onMounted, watch } from "vue";
import { useTheme } from "vuetify";
import { Icon } from "@iconify/vue";

// INITS
const theme = useTheme();

// REFS
const isDark = ref(false);

// FUNCTIONS
const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "dark" : "light";
  localStorage.setItem("totask-theme", theme.global.name.value);
};

// LIFE CYCLES
onMounted(() => {
  isDark.value =
    localStorage.getItem("totask-theme") === "dark" ? true : false;
  toggleTheme();
});
watch(isDark, () => {
  toggleTheme();
});
</script>
<template>
  <div class="">
    <v-btn variant="text" icon @click="isDark = !isDark" size="small">
      <Icon v-if="isDark === true" icon="ph-sun" width="30" />
      <Icon v-else icon="ph-moon" width="25" />
    </v-btn>
  </div>
</template>
