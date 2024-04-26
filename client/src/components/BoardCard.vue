<script setup>
import axios from "axios";
import { Icon } from "@iconify/vue";
import { ref, computed, onMounted } from "vue";
import { useFavoriteBoardsStore } from "@/stores/favoriteBoards";
import { storeToRefs } from "pinia";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const props = defineProps({
  board: Object,
});

const showFavBtn = ref(false);
const favoriteBoardsStore = useFavoriteBoardsStore();

const { favoriteBoards } = storeToRefs(favoriteBoardsStore)
const { addToFavorite, removeFromFavorite } = favoriteBoardsStore;
const isFavorite = computed(() => favoriteBoards.value.some((favoriteBoard) => favoriteBoard.id === props.board.id));
// onMounted(async () => {
//   await favoriteBoardsStore.getFavoriteBoards();
// })
</script>

<template>
  <div class="relative group" @mouseover="showFavBtn = true" @mouseleave="showFavBtn = false">
    <router-link :to="{ path: `/b/${board.id}` }" class="group">
      <v-card class="cursor-pointer " :class="board.backgroundColor == 'default'
        ? '!bg-gray-300 dark:!bg-darkPrimary cursor-pointer'
        : ''
        " min-height="120" :color="board.backgroundColor === 'default' ? '' : board.backgroundColor">
        <v-card-title>
          {{ board.name }}
        </v-card-title>
      </v-card>
    </router-link>
    <div
      class="transition-all duration-200 hover:opacity-100 absolute bottom-0 rounded-b-lg w-full flex justify-end group-hover:bg-gradient-to-t group-hover:from-black/20 group-hover:via-black/10 group-hover:to-transparent ">
      <Transition name="slide-fade">
        <v-btn @click="() =>
          isFavorite
            ? removeFromFavorite(board.id)
            : addToFavorite(board.id)
          " icon variant="text" size="x-small" class="mr-2 mb-2 right-0 group/fav z-50 absolute  block"
          v-if="showFavBtn" :ripple="false">

          <Icon :icon="isFavorite ? 'ph:star-fill' : 'ph:star'" width="15"
            class="group-hover/fav:scale-150 transition-all" :class="isFavorite ? 'text-yellow-400' : 'text-white'" />
        </v-btn>
      </Transition>
    </div>
  </div>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
  opacity: 1;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
