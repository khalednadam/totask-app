import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useCardSearchStore = defineStore("cardSearch", () => {
  const route = useRoute();
  const searchWord = ref(route.query.title || "");
  const searchLabels = ref(route.query.labels || []);
  const searchDate = ref(route.query.date || []);
  const searchAssignees = ref(route.query.assignees || []);

  const isFilter = computed(() => {
    if (searchLabels.value.length > 0) {
      return true;
    }
    if (searchAssignees.value.length > 0) {
      return true;
    }
    if (searchDate.value.length > 0) {
      return true;
    }
    return false;
  });
  const updateURL = debounce(() => {
    const queryString = new URLSearchParams({
    });

    searchLabels.value.forEach(label => {
      queryString.append('labels', label);
    });

    searchAssignees.value.forEach(assignee => {
      queryString.append('assignees', assignee);
    });

    searchDate.value.forEach(date => {
      queryString.append('date', date);
    });

    const newURL = `${window.location.pathname}?${queryString}`;
    window.history.replaceState({}, "", newURL);
  }, 500);

  watch(
    [searchWord, searchDate, searchLabels, searchAssignees],
    updateURL,
    { deep: true }
  );
  return { searchWord, searchLabels, searchDate, searchAssignees, isFilter };
});
