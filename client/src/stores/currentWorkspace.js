import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentWorkspace = defineStore("currentWorkspace", () => {
	const workspace = ref(undefined);
	return { workspace };
});
