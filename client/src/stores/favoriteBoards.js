import { ref } from "vue";
import { defineStore } from "pinia";
import axiosInstance from "../composables/axios";

export const useFavoriteBoardsStore = defineStore("favoriteBoards", () => {
  const favoriteBoards = ref([]);

  async function getFavoriteBoards() {
    try {
      const response = await axiosInstance.get(`/users/getFav`, {
        withCredentials: true,
      });
      favoriteBoards.value = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function addToFavorite(boardId) {
    try {
      const response = await axiosInstance.put(`/users/addToFav`, {
        boardId
      }, { withCredentials: true });
      favoriteBoards.value.push(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeFromFavorite(boardId) {
    try {
      const response = await axiosInstance.put(`/users/removeFromFav`,
        {
          boardId,
        },
        {
          withCredentials: true
        })
      favoriteBoards.value = favoriteBoards.value.filter((board) => board.id !== boardId)
    } catch (err) {
      console.log(err);
    }
  }


  function $reset() {
    favoriteBoards.value = null;
  }

  return { getFavoriteBoards, $reset, favoriteBoards, addToFavorite, removeFromFavorite };
});
