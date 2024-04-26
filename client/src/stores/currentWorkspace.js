import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentWorkspace = defineStore("currentWorkspace", () => {
	const workspace = ref(undefined);
	// async function getCurre
	return { workspace };
});
