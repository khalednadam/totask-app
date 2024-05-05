import { defineStore } from "pinia";
import { useBoards } from "../composables/utils";

export const useBoardsStore = defineStore("workspaces", (workspaceId) => {
  // const myAdminWorkspaces = ref(undefined);
  const { boards, isLoading } = useBoards(workspaceId, "updatedAt:desc", 4)
  // const myMemberWorkspaces = ref(undefined);
  // async function getCurre
  return { boards, isLoading };
});

