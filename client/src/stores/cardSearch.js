import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";
import debounce from 'lodash.debounce'

export const useCardSearchStore = defineStore("cardSearch", () => {
  const router = useRouter();
  const route = useRoute();
  const searchWord = ref(route.query.title || "");
  const searchLabels = ref(route.query.labels || []);
  const searchDate = ref(route.query.date || []);
  const searchAssignees = ref(route.query.assignees || []);
  console.log(route.query);
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
  })
  watch([searchWord, searchDate, searchLabels, searchAssignees], debounce(() => {
    router.replace({ query: { title: searchWord.value, assignees: searchAssignees.value, labels: searchLabels.value, date: searchDate.value } })
  }, 500))
  return { searchWord, searchLabels, searchDate, searchAssignees, isFilter }
})
