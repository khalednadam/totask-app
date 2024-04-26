import { ref } from "vue";
import { defineStore } from "pinia";

export const useBoardSearch = defineStore("boardSearch", () => {
  const searchWord = ref("");
  return { searchWord }
})
