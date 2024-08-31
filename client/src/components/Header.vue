<script setup>
import { Icon } from "@iconify/vue";
import AddBoardModal from "./Modals/AddBoardModal.vue";
import { useDisplay } from "vuetify";
import ModeSwitcher from "../components/ModeSwitcher.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Logo from "./Logo.vue";
import { useBoardSearch } from "../stores/boardSearch";
import { storeToRefs } from "pinia";

const { mdAndUp, smAndDown } = useDisplay();
const route = useRoute();
const props = defineProps({
  drawer: Boolean,
});
const emits = defineEmits(["toggleDrawer"]);

const addNewBoardDialog = ref(false);
const boardSearch = useBoardSearch();
const { searchWord } = storeToRefs(boardSearch);
</script>

<template>
  <v-app-bar elevation="0" density="compact">
    <v-row no-gutters class="items-center my-auto px-5 !py-0 !m-0">
      <v-col cols="5" class="">
        <div class="flex">
          <v-btn
            v-if="smAndDown"
            variant="text"
            icon
            rounded="lg"
            @click="$emit('toggleDrawer')"
          >
            <Icon icon="ph:list" width="35"></Icon>
          </v-btn>
          <v-text-field
            autocomplete="off"
            v-if="mdAndUp && route.path !== '/settings'"
            v-model="searchWord"
            clearable=""
            color="primary"
            rounded
            placeholder="Search for boards"
            hide-details
            density="compact"
          >
            <template #append-inner>
              <Icon icon="ph:magnifying-glass" width="25"></Icon>
            </template>
          </v-text-field>
          <v-dialog v-if="smAndDown && route.path !== '/settings'">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                icon
                size="small"
                rounded="lg"
              >
                <Icon icon="ph:magnifying-glass" width="25"></Icon>
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-title> Search for boards </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-if="route.path !== '/settings'"
                    autocomplete="off"
                    clearable
                    v-model="searchWord"
                    variant="outlined"
                    color="primary"
                    rounded
                    placeholder="Search for boards"
                    hide-details
                    density="compact"
                  >
                    <template #append-inner>
                      <Icon icon="ph:magnifying-glass" width="25"></Icon>
                    </template>
                  </v-text-field>
                  <div class="flex mt-2 justify-end justify-self-end gap-2">
                    <v-btn
                      color="primary"
                      @click="
                        () => {
                          searchWord = '';
                          isActive.value = false;
                        }
                      "
                      variant="outlined"
                    >
                      Cancel
                    </v-btn>
                    <v-btn color="primary" @click="isActive.value = false">
                      Done
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </v-col>
      <v-col cols="5" class="flex flex-col justify-center">
        <div class="md:space-x-5 space-x-2 px-2 flex items-center">
          <v-btn
            color="onbackground"
            variant="flat"
            v-if="mdAndUp && route.path !== '/settings'"
            @click="() => (addNewBoardDialog = !addNewBoardDialog)"
          >
            <template #append>
              <Icon icon="ph:plus-bold" width="20"></Icon>
            </template>
            <p class="flex justify-center items-center font-bold">New Board</p>
          </v-btn>
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
  <v-dialog :scrollable="true" v-model="addNewBoardDialog">
    <AddBoardModal
      :members="undefined"
      :workspace="undefined"
      @toggle-modal="() => (addNewBoardDialog = false)"
    />
  </v-dialog>
</template>
