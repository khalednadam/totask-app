<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';
import { useFavoriteBoardsStore } from "../stores/favoriteBoards";
import { Icon } from '@iconify/vue';

const favoriteBoardsStore = useFavoriteBoardsStore();

const props = defineProps({
  boardName: String,
  boardId: String,
  boardBackgroundColor: String
})

const { favoriteBoards } = storeToRefs(favoriteBoardsStore)
const { addToFavorite, removeFromFavorite, getFavoriteBoards } = favoriteBoardsStore;
const isFavorite = computed(() => favoriteBoards.value.some((favoriteBoard) => favoriteBoard.id === props.boardId));
// onMounted(async () => {
// await getFavoriteBoards();
// })
</script>

<template>
  <v-list-item :active="$route.fullPath === `/b/${boardId}`">
    <template v-slot:prepend>
      <v-avatar size="small" :color="boardBackgroundColor" rounded="lg">
      </v-avatar>
    </template>
    <v-tooltip :text="boardName">
      <template v-slot:activator="{ props }">
        <router-link v-bind="props" :to="`/b/${boardId}`">
          <p class="max-w-[95%] truncate">
            {{ boardName }}
          </p>
        </router-link>
      </template>
    </v-tooltip>
    <template v-slot:append>
      <v-btn @click="() =>
        isFavorite
          ? removeFromFavorite(boardId)
          : addToFavorite(boardId)
        " icon variant="text" size="x-small" class="ml-3 group/fav z-50 " :ripple="false">
        <Icon :icon="isFavorite ? 'ph:star-fill' : 'ph:star'" width="20" class=""
          :class="isFavorite ? 'text-yellow-400' : ''" />
      </v-btn>
    </template>
  </v-list-item>
</template>
