<script setup>
// IMPORTS
import { Icon } from "@iconify/vue";
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
const { mdAndUp } = useDisplay();

const route = useRoute();
const scrolledDown = ref(false);
const drawer = ref(false);
const checkScroll = () => {
  scrolledDown.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <div class="flex flex-col h-full">
    <v-app-bar
      :elevation="scrolledDown ? 2 : 0"
      density="default"
      class="transition-all duration-200"
      transition="fade-transition"
      :color="scrolledDown ? 'white' : 'white'"
    >
      <v-container v-if="mdAndUp">
        <div class="flex w-full justify-between">
          <div class="flex items-center justify-start gap-10">
            <v-img :width="100" class="" src="/colored-logo.svg"> </v-img>
            <div class="flex gap-7 items-center">
              <div class="flex items-center">
                <router-link to="/home">
                  <v-btn
                    :variant="route.path === '/home' ? 'tonal' : 'text'"
                    color="primary"
                  >
                    Home
                  </v-btn>
                </router-link>
              </div>
              <div class="flex items-center">
                <router-link to="/home/about">
                  <v-btn
                    :variant="route.path === '/home/about' ? 'tonal' : 'text'"
                    color="primary"
                  >
                    About
                  </v-btn>
                </router-link>
              </div>
              <div class="flex items-center">
                <router-link to="/home/blog">
                  <v-btn
                    :variant="route.path === '/home/blog' ? 'tonal' : 'text'"
                    color="primary"
                  >
                    Blog
                  </v-btn>
                </router-link>
              </div>
            </div>
          </div>
          <div>
            <router-link to="/login">
              <v-btn> Login </v-btn>
            </router-link>
            <router-link to="/register">
              <v-btn color="primary" variant="flat"> Register </v-btn>
            </router-link>
          </div>
        </div>
      </v-container>
      <v-container v-else>
        <div class="flex w-full justify-between">
          <div class="flex items-center justify-start gap-10">
            <v-img :width="100" class="" src="/colored-logo.svg"> </v-img>
          </div>
          <v-btn icon @click="drawer = !drawer">
            <Icon icon="ph:list" width="25" v-if="!drawer" />
            <Icon icon="ph:x" width="25" v-else />
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
    <v-container>
      <v-main class="h-full">
        <v-navigation-drawer
          v-model="drawer"
          v-if="!mdAndUp"
          location="right"
          color="base"
        >
          <v-list>
            <div class="flex items-center">
              <v-list-item>
                <router-link to="/home">
                  <v-btn
                    :variant="route.path === '/home' ? 'tonal' : 'text'"
                    color="primary"
                  >
                    Home
                  </v-btn>
                </router-link>
              </v-list-item>
            </div>
            <v-list-item>
              <router-link to="/home/about">
                <v-btn
                  :variant="route.path === '/home/about' ? 'tonal' : 'text'"
                  color="primary"
                >
                  About
                </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link to="/home/blog">
                <v-btn
                  :variant="route.path === '/home/blog' ? 'tonal' : 'text'"
                  color="primary"
                >
                  Blog
                </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link to="/login">
                <v-btn color="primary" variant="outline"> Login </v-btn>
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link to="/register">
                <v-btn color="primary" variant="flat"> Register </v-btn>
              </router-link>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <slot></slot>
      </v-main>
    </v-container>
    <div class="h-full flex w-full justify-end items-end">
      <v-footer
        class="place-items-end h-max flex justify-self-end"
        color="primary"
      >
        <div
          class="flex flex-col justify-center w-full items-center text-center"
        >
          <strong class="text-center"
            >Get connected with us on social networks!</strong
          >
          <div class="mt-2 flex gap-2">
            <a href="https://x.com/kn_swe" target="_blank">
              <Icon icon="ph:x-logo" width="20" />
            </a>
            <a href="https://instagram.com/software_journey1" target="_blank">
              <Icon icon="ph:instagram-logo" width="20" />
            </a>
            <a
              href="https://www.linkedin.com/in/khaled-nadam-2b7693150/"
              target="_blank"
            >
              <Icon icon="ph:linkedin-logo" width="20" />
            </a>
          </div>
          <div class="flex justify-center items-center gap-2 mt-5">
            <router-link to="/">
              <p>Home</p>
            </router-link>
            <router-link to="/home/blog">
              <p>Blog</p>
            </router-link>
            <router-link to="/home/about">
              <p>About</p>
            </router-link>
            <router-link to="/login">
              <p>Login</p>
            </router-link>
            <router-link to="/register">
              <p>Register</p>
            </router-link>
          </div>
          <div>© Totask. All rights reserved.</div>
        </div>
      </v-footer>
    </div>
  </div>
</template>
