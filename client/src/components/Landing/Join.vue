<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { mdAndUp } = useDisplay();
</script>
<template>
  <div>
    <v-row class="min-h-[400px]">
      <v-col cols="12" class="min-h-full">
        <v-card color="primaryTransparent" variant="flat" class="overflow-hidden h-full">
          <v-row class="h-full">
            <v-col cols="12" md="6" class="flex flex-col justify-center  min-h-full">
              <v-card-text class="my-2 flex flex-col justify-center">
                <div class="flex gap-1 items-center my-5">
                  <h1 class="text-primary">
                    Join totask for
                  </h1>
                  <h1 class="font-black w-max bg-secondary px-3 transform rotate-6">free</h1>
                </div>
                <p class="my-2 mb-5">
                  Discover the simplicity of efficient task management with totask. Organize your projects effortlessly
                  and
                  boost collaboration with our intuitive platform. Join for free today and experience a new level of
                  productivity.
                </p>
                <v-btn to="/register" color="primary" variant="flat" size="x-large" class="w-max">
                  Join
                </v-btn>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6" class="relative" v-if="mdAndUp">
              <div class="px-5 bg-primary/60 rounded-lg absolute mt-20 ml-40">
                <v-img src="/in-app.webp" height="370" width="532"></v-img>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
