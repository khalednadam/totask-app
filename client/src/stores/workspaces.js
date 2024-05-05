import { defineStore } from "pinia";
import { getRecentWorkspaces } from "../composables/utils";

export const useWorkspaces = defineStore("workspaces", () => {
  // const myAdminWorkspaces = ref(undefined);
  const { recentWorkspaces, isLoading } = getRecentWorkspaces();
  // const myMemberWorkspaces = ref(undefined);
  // async function getCurre
  return { recentWorkspaces, isLoading };
});
