<script setup>
// IMPORTS
import { Icon } from '@iconify/vue';
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { mdAndUp } = useDisplay();

const scrolledDown = ref(false);
const drawer = ref(false);
// Function to check if the user has scrolled down
const checkScroll = () => {
  // You can adjust the value (e.g., 100) according to how much scrolling you require to show the element
  scrolledDown.value = window.scrollY > 100;
};

// Attach event listener when component is mounted
onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <v-app-bar :elevation="scrolledDown ? 2 : 0" density="default" class="transition-all duration-200"
    transition="fade-transition" :color="scrolledDown ? 'white' : 'white'">
    <v-container v-if="mdAndUp">
      <div class="flex w-full justify-between ">
        <div class="flex items-center justify-start gap-10">
          <v-img :width="100" class="" src="/colored-logo.svg">
          </v-img>
          <div class="flex gap-7 items-center">
            <div class="flex items-center">
              <router-link to="/home">
                <p class="cursor-pointer">
                  Home
                </p>
              </router-link>
            </div>
            <div class="flex items-center">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="flex cursor-pointer items-center">
                    <p>
                      Features
                    </p>
                    <Icon icon="ph:caret-down" width="20" />
                  </div>
                </template>
                <v-list>
                  <v-list-item>
                    Real time updates
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="flex items-center">
              <p class="cursor-pointer">
                About
              </p>
            </div>
            <div class="flex items-center">
              <router-link to="/home/blog">
                <p class="cursor-pointer">
                  Blog
                </p>
              </router-link>
            </div>
          </div>
        </div>
        <div>
          <router-link to="/login">
            <v-btn>
              Login
            </v-btn>
          </router-link>
          <router-link to="/register">
            <v-btn color="primary" variant="flat">
              Register
            </v-btn>
          </router-link>
        </div>
      </div>
    </v-container>
    <v-container v-else>
      <div class="flex w-full justify-between ">
        <div class="flex items-center justify-start gap-10">
          <v-img :width="100" class="" src="/colored-logo.svg">
          </v-img>
        </div>
        <v-btn icon @click="drawer = !drawer">
          <Icon icon="ph:list" width="25" v-if="!drawer" />
          <Icon icon="ph:x" width="25" v-else />
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
  <v-container>
    <v-main theme>
      <v-navigation-drawer v-model="drawer" v-if="!mdAndUp" location="right" color="base">
        <v-list>
          <div class="flex items-center">
            <v-list-item>
              <router-link to="/home">
                <p class="cursor-pointer">
                  Home
                </p>
              </router-link>
            </v-list-item>
          </div>
          <div class="flex items-center">
            <v-list-item>
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="flex cursor-pointer items-center">
                    <p>
                      Features
                    </p>
                    <Icon icon="ph:caret-down" width="20" />
                  </div>
                </template>
                <v-list>
                  <v-list-item>
                    Real time updates
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
          </div>
          <v-list-item>
            <p class="cursor-pointer">
              About
            </p>
          </v-list-item>
          <v-list-item>
            <router-link to="/home/blog">
              <p class="cursor-pointer">
                Blog
              </p>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/login">
              Login
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/register">
              <v-btn color="primary" variant="flat">
                Register
              </v-btn>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <slot></slot>
    </v-main>
  </v-container>
</template>
