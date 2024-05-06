<script setup>
import { useDisplay } from 'vuetify';
const { mdAndUp } = useDisplay();
</script>
<template>
  <div>
    <div class="h-[60vh]  w-full flex md:flex-row justify-start items-center">
      <div class="w-full flex items-start gap-5 justify-start flex-col">
        <h1 class="text-5xl md:max-w-[90%] font-light text-start">
          Streamline your <span class="text-primary font-semibold"> workflow </span> and collaborate <span
            class="text-primary font-semibold"> seamlessly
          </span> with your
          team.
        </h1>
        <p class="text-center text-2xl">
          Keep everthing under one roof.
        </p>
        <div class="mt-3">
          <router-link to="/register">
            <v-btn color="primary" size="x-large">
              Get started
            </v-btn>
          </router-link>
        </div>
      </div>
      <v-img src="/hero.svg" rounded="lg" width="350" v-if="mdAndUp">
      </v-img>
    </div>
    <div class="space-y-2 my-4 ">
      <h2 class="text-4xl">
        Unleash Your Productivity
      </h2>
      <p class="md:max-w-[50%] w-full">
        Unleash productivity with our innovative task management tool. Seamlessly blend simplicity, flexibility, and power
        to turn chaos into clarity. Easily navigate boards, lists, and cards for clear insights into your team's actions.
        Dive into our guide for streamlined efficiency.
      </p>
    </div>
    <div class="flex justify-center h-full gap-2 items-start">
      <div class="bg-primary/50 p-2 rounded-lg w-full">
        <v-img src="/in-app.webp" rounded="lg" class="w-full">
        </v-img>
      </div>
    </div>
  </div>
</template>
