import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useCardSearchStore = defineStore("cardSearch", () => {
  const router = useRouter();
  const route = useRoute();
  const searchWord = ref(route.query.title || "");
  const searchLabels = ref(route.query.labels || []);
  const searchDate = ref(route.query.date || []);
  const searchAssignees = ref(route.query.assignees || []);

  const isFilter = computed(() => {
    if (searchWord.value.length > 0) {
      return true;
    }
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
  // watch(
  //   [searchWord, searchDate, searchLabels, searchAssignees],
  //   debounce(() => {
  //     window.history.replaceState(null, '', `?title=${searchWord.value}?assignees=${searchAssignees.value}?labels=${searchLabels.value}?date=${searchDate.value}`);

  //     router.replace({
  //       query: {
  //         title: searchWord.value,
  //         assignees: searchAssignees.value,
  //         labels: searchLabels.value,
  //         date: searchDate.value,
  //       },
  //     });
  //   }, 500),
  // );
  const updateURL = debounce(() => {
    const queryString = new URLSearchParams({
      title: searchWord.value,
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
