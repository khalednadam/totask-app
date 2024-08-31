import { defineStore } from "pinia";
import { useBoards } from "../composables/utils";

export const useBoardsStore = defineStore("workspaces", (workspaceId) => {
  const { boards, isLoading } = useBoards(workspaceId, "updatedAt:desc", 4)
  return { boards, isLoading };
});

