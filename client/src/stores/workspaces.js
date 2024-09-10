import { defineStore } from "pinia";
import { getRecentWorkspaces } from "../composables/utils";

export const useWorkspaces = defineStore("workspaces", () => {
  const { recentWorkspaces, isLoading } = getRecentWorkspaces();
  return { recentWorkspaces, isLoading };
});
