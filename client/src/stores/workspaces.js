import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkspaces = defineStore("workspaces", () => {
	const myAdminWorkspaces = ref(undefined);
	const myMemberWorkspaces = ref(undefined);
	// async function getCurre
	return { myAdminWorkspaces, myMemberWorkspaces };
});
