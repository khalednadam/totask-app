import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "../composables/socket";

export const useCardDetailsStore = defineStore("cardDetails", () => {
  const cardId = ref(null);
  const isActive = ref(false);
  function $reset() {
    isActive.value = false;
    cardId.value = null;
  }
  socket.on('delete-card', (deletedCardId) => {
    if (deletedCardId === cardId.value) {
      $reset();
    }
  })
  return { cardId, $reset, isActive }
})
