import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore("board", (boardId) => {
  const currentBoard = ref({});
  const currentStatus = ref(401);
  const sideDrawer = ref(false);
  const currentBoardIsAdmin = ref(false);
  const settingsDrawer = ref(false);
  return {
    currentBoard, currentStatus, sideDrawer, currentBoardIsAdmin, settingsDrawer
  }
});



