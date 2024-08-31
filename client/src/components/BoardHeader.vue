<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import ModeSwitcher from "@/components/ModeSwitcher.vue";
import { useCardSearchStore } from "@/stores/cardSearch";
import Logo from "@/components/Logo.vue";

const { mdAndDown } = useDisplay();
const route = useRoute();
const props = defineProps({
  drawer: Boolean,
});
const emits = defineEmits(["toggleDrawer"]);
const cardSearch = useCardSearchStore();

const { searchWord } = storeToRefs(cardSearch);
</script>

<template>
  <v-app-bar
    density="compact"
    elevation="0"
    :style="{
      backgroundColor: `rgba(var(--v-theme-background) , 0.2)`,
      color: '#fff',
    }"
  >
    <v-row no-gutters class="items-center my-auto px-5 !py-0 !m-0">
      <v-col md="9" cols="10" class="flex flex-col justify-center">
        <div class="md:space-x-5 space-x-2 flex items-center">
          <v-tooltip text="ctrl+/">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                size="small"
                v-if="mdAndDown || route.name === 'Board'"
                variant="text"
                icon
                rounded="lg"
                @click="$emit('toggleDrawer')"
              >
                <Icon icon="ph:list" width="25"></Icon>
              </v-btn>
            </template>
          </v-tooltip>
          <!-- board search  -->
          <v-dialog v-if="mdAndDown">
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
                <v-card-title> Search for cards </v-card-title>
                <v-card-text>
                  <v-text-field
                    clearable
                    v-model="searchWord"
                    variant="outlined"
                    color="primary"
                    rounded
                    @clear="() => (searchWord = '')"
                    placeholder="Search for cards"
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
          <v-text-field
            v-else
            clearable
            v-model="searchWord"
            variant="outlined"
            color="primary"
            rounded
            placeholder="Search for cards"
            class="max-w-[40%]"
            hide-details
            @clear="() => (searchWord = '')"
            density="compact"
          >
            <template #append-inner>
              <Icon icon="ph:magnifying-glass" width="25"></Icon>
            </template>
          </v-text-field>
        </div>
      </v-col>
      <v-col md="3" cols="2">
        <div class="flex justify-end items-center">
          <ModeSwitcher />
          <Logo />
        </div>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-app-bar>
</template>
