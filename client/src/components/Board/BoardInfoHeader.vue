<script setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { useRoute } from "vue-router";
import UserAvatar from "../UserAvatar.vue";
import UserProfile from "../UserProfile.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFavoriteBoardsStore } from "../../stores/favoriteBoards";
import BoardFilters from "./BoardFilters.vue";
import { useDisplay } from "vuetify";

const isBoardFavorite = defineModel("isBoardFavorite");
const boardSettingsDialog = defineModel("boardSettingsDrawer");

const { mdAndUp } = useDisplay();
const favoriteBoardsStore = useFavoriteBoardsStore();
const { addToFavorite, removeFromFavorite } = favoriteBoardsStore;

const { favoriteBoards } = storeToRefs(favoriteBoardsStore);
const route = useRoute();
const props = defineProps({
  boardName: String,
  boardMembers: Array,
  boardLabels: Array,
  isAdmin: Boolean,
});
const isFavorite = computed(() =>
  favoriteBoards.value.some(
    (favoriteBoard) => favoriteBoard.id === route.params.boardId
  )
);

const toggleFavorite = () => {
  if (isBoardFavorite.value) {
    removeFromFavorite(route.params.boardId);
    isBoardFavorite.value = false;
  } else {
    addToFavorite(route.params.boardId);
    isBoardFavorite.value = true;
  }
};
</script>
<template>
  <v-app-bar
    :elevation="0"
    density="compact"
    class="flex items-center px-10"
    style="background-color: rgba(0, 0, 0, 0.3)"
  >
    <v-row>
      <v-col md="5" cols="5" class="flex flex-col justify-center">
        <div class="flex items-center">
          <v-tooltip :text="boardName">
            <template v-slot:activator="{ props }">
              <h1
                v-bind="props"
                class="text-3xl text-white w-max cursor-pointer max-w-[200px] truncate"
              >
                {{ boardName }}
              </h1>
            </template>
          </v-tooltip>
          <v-btn
            @click="() => toggleFavorite(route.params.boardId)"
            icon
            variant="text"
            size="x-small"
            class="ml-3 group/fav z-50"
            :ripple="false"
          >
            <Icon
              :icon="isFavorite ? 'ph:star-fill' : 'ph:star'"
              width="25"
              :class="isFavorite ? 'text-yellow-400' : 'text-white'"
            />
          </v-btn>
        </div>
      </v-col>
      <v-col cols="7" class="justify-end flex flex-col items-end">
        <div class="flex items-center">
          <BoardFilters
            :board-members="boardMembers"
            :board-labels="boardLabels"
          />
          <div class="-space-x-2 flex">
            <UserAvatar
              v-if="mdAndUp"
              class="z-50"
              v-for="user in boardMembers?.slice(0, 1)"
              :user
            />
            <v-dialog>
              <template v-slot:activator="{ props }">
                <v-btn
                  rounded="full"
                  v-bind="props"
                  size="32"
                  icon
                  variant="flat"
                  color="primary"
                >
                  <Icon icon="ph:dots-three-outline-fill" />
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card class="md:max-w-[500px] md:min-w-[300px] mx-auto">
                  <v-card-text>
                    <div class="flex justify-between items-center">
                      <p class="text-lg">Board Members</p>
                      <v-btn
                        variant="text"
                        class=""
                        icon
                        size="35"
                        @click="() => (isActive.value = false)"
                      >
                        <Icon icon="ph:x"></Icon>
                      </v-btn>
                    </div>
                    <v-list>
                      <UserProfile
                        v-for="user in boardMembers"
                        :key="user.id"
                        :member="user"
                      />
                    </v-list>
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </div>
          <v-btn
            variant="text"
            icon
            @click="() => (boardSettingsDialog = !boardSettingsDialog)"
          >
            <Icon
              icon="ph:gear"
              width="30"
              color="white"
              v-if="isAdmin === true"
            />
            <Icon icon="ph:info" width="30" color="white" v-else />
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
