<script setup>
import { useDisplay } from "vuetify";
import ModeSwitcher from "@/components/ModeSwitcher.vue";
import { useRoute } from "vue-router";
import Logo from "@/components/Logo.vue";

const { mdAndUp, smAndDown } = useDisplay();
const route = useRoute();
const props = defineProps({
  drawer: Boolean,
});
const emits = defineEmits(["toggleDrawer"]);

</script>

<template>
  <!-- <div
		class="h-[65px] items-end my-auto py-1 w-full mb-[100px] top-0 dark:bg-dark-background bg-light-background"
	> -->
  <v-app-bar elevation="0" density="compact">
    <v-row no-gutters class="items-center my-auto  px-5 !py-0 !m-0">
      <v-col cols="5" class="">
      </v-col>
      <v-col cols="5" class="flex flex-col justify-center ">
        <div class="md:space-x-5 space-x-2 px-2 flex items-center">
        </div>
      </v-col>
      <v-col cols="2">
        <div class="flex justify-end items-center">
          <ModeSwitcher />
          <Logo />
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
