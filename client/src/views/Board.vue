<script setup>
import { useRouter, useRoute } from "vue-router";
import { onClickOutside } from '@vueuse/core'
import { getWorkspaceMembersByBoardId, getBoardById, useBoards } from "../composables/utils"
import { watch, defineAsyncComponent, computed, ref, onMounted, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useToast } from "vue-toastification";
import { useFavoriteBoardsStore } from "@/stores/favoriteBoards";
import { socket } from "../composables/socket";
import UserAvatar from "../components/UserAvatar.vue";
import BoardHeader from "../components/BoardHeader.vue";
import { storeToRefs } from "pinia";
import SidebarWorkspaceBoardItem from "../components/SidebarWorkspaceBoardItem.vue";
import UserProfile from "../components/UserProfile.vue";
import { useCardDetailsStore } from "../stores/cardDetails";
import { useDisplay, useTheme } from "vuetify/lib/framework.mjs";
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import { useCardSearchStore } from "../stores/cardSearch";
import axiosInstance from "../composables/axios";

const DangerDeleteModal = defineAsyncComponent(() => import("../components/Modals/DangerDeleteModal.vue"));
const DraggableLists = defineAsyncComponent(() => import("../components/DraggableLists.vue"));

const BoardSettings = defineAsyncComponent(() =>
  import('../components/BoardSettings.vue')
);

const BoardInfo = defineAsyncComponent(() =>
  import('../components/BoardInfo.vue')
);

const CardDetails = defineAsyncComponent(() => import('../components/Modals/CardDetails.vue'))
const cardSearch = useCardSearchStore();
const { searchAssignees, searchDate, searchLabels, isFilter } = storeToRefs(cardSearch)
const theme = useTheme();
const { mdAndUp } = useDisplay();
const favoriteBoardsStore = useFavoriteBoardsStore();
const route = useRoute();
const toast = useToast();
const workspaceAllMembers = ref();
const isAdmin = ref(false);
const { favoriteBoards } = storeToRefs(favoriteBoardsStore)
const { addToFavorite, removeFromFavorite } = favoriteBoardsStore;
const router = useRouter();
const { board, status, isLoading } = getBoardById(route.params.boardId)
const showAddList = ref(false);
const newListName = ref("");
const newTarget = ref(null);
// const isFavorite = computed(() => favoriteBoards.value.some((favoriteBoard) => favoriteBoard.id === route.params.boardId));
const boardSettingsDialog = ref(false)
const isAddingListLoading = ref(false);
const deleteBoardDialog = ref(false);
const cardDetailsStore = useCardDetailsStore();

const { isActive } = storeToRefs(cardDetailsStore);
onClickOutside(newTarget, () => showAddList.value = false);

let boardCopy = reactive(board);
const drawer = ref(false);

// TODO: refactor side drawer

const reopenBoard = (workspaceId) => {
  isLoading.value = true;
  axiosInstance.put(`/b/${route.params.boardId}`,
    {
      workspace: workspaceId,
      closed: false
    }
    ,
    { withCredentials: true }).then((res) => {
      success();
      socket.emit("change-board-info", route.params.boardId)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      isLoading.value = false;
    })
}

const deleteBoard = () => {
  isLoading.value = true;
  axiosInstance.delete(`/b/${route.params.boardId}`,
    { withCredentials: true }).then((res) => {
      emit("success")
      socket.emit("change-board-info", route.params.boardId)
      router.push("/")
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      isLoading.value = false;
    })
}

const addList = () => {
  isAddingListLoading.value = true;
  axiosInstance.post(`/list/create`, {
    board: route.params.boardId,
    name: newListName.value
  }, {
    withCredentials: true
  }).then(() => {
    socket.emit("update-lists", route.params.boardId);
    newListName.value = "";
    toast.success("List created");
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    isAddingListLoading.value = false;
  })
}

const success = () => {
  boardSettingsDialog.value = false;
  toast.success("Board updated");
}

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  localStorage.setItem("board-sidebar", drawer.value);
}

onMounted(async () => {
  socket.emit("subscribe", route.params.boardId);
  await favoriteBoardsStore.getFavoriteBoards();
  drawer.value = localStorage.getItem("board-sidebar") === "true" && mdAndUp.value ? true : false;
});

watch(board, () => {
  isAdmin.value = board.value.isAdmin;
})

const isFavorite = computed(() => favoriteBoards.value.some(favoriteBoard => favoriteBoard.id === route.params.boardId));
const toggleFavorite = (boardId) => {
  if (board.value.isFavorite) {
    removeFromFavorite(route.params.boardId);
    board.value.isFavorite = false;
  } else {
    addToFavorite(route.params.boardId);
    board.value.isFavorite = true;
  }

}

</script>

<template>
  <v-main v-if="isLoading && !board" class="flex flex-col justify-center items-center gap-5 h-[95vh]">
    <v-progress-circular color="primary" indeterminate="disable-shrink" size="50" width="5"></v-progress-circular>
  </v-main>
  <div v-else>
    <v-navigation-drawer v-model="drawer" location="left" color="base" v-if="status < 205">
      <template v-slot:prepend>
        <v-list-item lines="two" :title="board?.workspace.name">
          <template v-slot:prepend>
            <v-avatar color="primary" rounded="lg">
              {{ board?.workspace.name[0].toUpperCase() }}
            </v-avatar>
          </template>
        </v-list-item>
      </template>
      <v-divider class="border-2 dark:border-white border-black"></v-divider>
      <v-list class="w-11/12 mx-auto space-y-2">
        <router-link :to="`/`">
          <v-list-item :active="router.currentRoute.value.fullPath === `/`" color="primary" title="Home">
            <template #prepend>
              <Icon icon="ph:house" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link :to="`/w/${board?.workspace.id}`">
          <v-list-item :active="router.currentRoute.value.fullPath === `/w/${board?.workspace.id}`" color="primary"
            title="Boards">
            <template #prepend>
              <Icon icon="ph:columns" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <router-link :to="`/w/settings/${board?.workspace.id}`">
          <v-list-item color="primary" title="Settings" :active="router.currentRoute.value.fullPath === '/settings'">
            <template #prepend>
              <Icon icon="ph:gear" width="20"> </Icon>
            </template>
          </v-list-item>
        </router-link>
        <v-divider class="border-2 dark:border-white border-black"></v-divider>
        <v-list-item-subtitle class="">
          This workspace's boards
        </v-list-item-subtitle>
        <div class="mt-2 space-y-2">
          <SidebarWorkspaceBoardItem v-for="board in board?.workspace.boards" :board-id="board.id"
            :board-background-color="board.backgroundColor" :board-name="board.name" />
        </div>
      </v-list>
    </v-navigation-drawer>
    <BoardHeader @toggle-drawer="() => toggleDrawer()" :drawer="drawer" />
    <v-main v-if="status > 205">
      <div class="mt-10">
        <v-row>
          <v-col>
            <div class="flex flex-col gap-3 justify-center items-center">
              <h1 class="text-center text-3xl">
                Board not found
              </h1>
              <p class="md:w-2/6 w-full mx-auto text-center">
                This board may be private. If someone gave you this link, they may need to
                invite you to their Workspace.
              </p>
              <router-link to="/">
                <v-btn color="primary" class="w-max">
                  Home
                </v-btn>
              </router-link>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-main>
    <v-main v-if="status < 205" :style="{ backgroundColor: board?.backgroundColor }" class="h-screen overflow-x-auto ">
      <div v-if="board?.closed" class="w-full h-full gap-2 flex flex-col justify-center items-center">
        <h1>
          This Board is closed
        </h1>
        <div class="flex flex-col justify-center  items-center gap-2">
          <v-btn variant="flat" color="primary" @click="() => reopenBoard(board?.workspace.id)">
            Reopen board
          </v-btn>
          <v-btn variant="text" color="primary" @click="deleteBoardDialog = true">
            Permanently delete board
          </v-btn>
        </div>
      </div>
      <div class="flex flex-col items-start justify-start" v-else>
        <v-app-bar :elevation="0" density="compact" class="flex items-center px-10 "
          style="background-color: rgba(0, 0, 0, 0.3);">
          <!-- <div class="flex justify-start items-center w-max cursor-pointer "> -->
          <v-row>
            <v-col md="5" cols="5">
              <div class="flex items-center">
                <v-tooltip :text="board?.name">
                  <template v-slot:activator="{ props }">
                    <h1 v-bind="props" class="text-3xl pt-1 text-white w-max cursor-pointer max-w-[200px] truncate">
                      {{ board?.name }}
                    </h1>
                  </template>
                </v-tooltip>
                <v-btn @click="() => toggleFavorite(board?.id)" icon variant="text" size="x-small"
                  class="ml-3 group/fav z-50 " :ripple="false">
                  <Icon :icon="isFavorite ? 'ph:star-fill' : 'ph:star'" width="25" class=""
                    :class="isFavorite ? 'text-yellow-400' : 'text-white'" />
                </v-btn>
              </div>
            </v-col>
            <v-col cols="7" class="justify-end flex flex-col items-end">
              <div class="flex items-center">
                <div class="mx-1">
                  <v-menu :close-on-content-click="false" :close-on-back="false">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" color="white" variant="outlined" rounded>
                        <v-badge v-if="isFilter" floating dot class="top-2 right-1 absolute">
                        </v-badge>
                        <template v-slot:append>
                          <Icon icon="ph:caret-down" width="20" />
                        </template>
                        Filters
                      </v-btn>
                    </template>
                    <v-card class="min-w-[250px]">
                      <v-card-text class="space-y-5">
                        <v-autocomplete multiple hide-details label="Members" v-model="searchAssignees"
                          :items="board.members" item-title="name" item-value="id">
                        </v-autocomplete>
                        <v-menu :close-on-content-click="false">
                          <template v-slot:activator="{ props }">
                            <v-btn class="w-full flex text-start" variant="outlined" v-bind="props">
                              Labels
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-text>
                              <v-item-group v-model="searchLabels" multiple class="space-y-2 my-2 w-96">
                                <v-item v-for="label in board.labels" :value="label.id" v-slot="{ isSelected, toggle }">
                                  <div class="flex items-center">
                                    <v-btn class="w-full" :color="label.color" @click="toggle">
                                      <p v-if="label.title">
                                        {{ label.title }}
                                      </p>
                                      <template v-slot:prepend v-if="isSelected">
                                        <Icon icon="ph:check" width="20" />
                                      </template>
                                    </v-btn>
                                  </div>
                                </v-item>
                              </v-item-group>
                            </v-card-text>
                          </v-card>
                        </v-menu>
                        <VueDatePicker range inline class="w-full" menu-class-name="absolute" v-model="searchDate"
                          :dark="theme.global.name.value === 'dark'">
                          <template #action-row="{ internalModelValue, selectDate }">
                            <div class="action-row flex gap-1 w-full">
                              <v-btn class="select-button w-1/2" color="primary" variant="outlined"
                                @click="searchDate = []">
                                Delete
                              </v-btn>
                              <v-btn class="select-button w-1/2" color="primary" @click="selectDate">Select
                                Date</v-btn>
                            </div>
                          </template>
                        </VueDatePicker>
                      </v-card-text>
                    </v-card>
                  </v-menu>

                </div>
                <div class="-space-x-2 flex">
                  <UserAvatar class="z-50" v-for="user in board?.members.slice(0, 1)" :user v-if="mdAndUp" />
                  <v-dialog>
                    <template v-slot:activator="{ props }">
                      <v-btn rounded="full" v-bind="props" size="32" icon variant="flat" color="primary">
                        <Icon icon="ph:dots-three-outline-fill" />
                      </v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                      <v-card class="md:max-w-[500px] md:min-w-[300px] mx-auto">
                        <v-card-text>
                          <div class="flex justify-between items-center">
                            <p class="text-lg">
                              Board Members
                            </p>
                            <v-btn variant="text" class="" icon size="35" @click="() => isActive.value = false">
                              <Icon icon="ph:x"></Icon>
                            </v-btn>
                          </div>
                          <v-list>
                            <UserProfile v-for="user in board?.members" :member="user" />
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-dialog>
                </div>
                <v-btn variant="text" icon @click="() => boardSettingsDialog = true">
                  <Icon icon="ph:gear" width="30" color="white" v-if="isAdmin === true" />
                  <Icon icon="ph:info" width="30" color="white" v-else />
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-app-bar>

        <div class="flex h-[80vh] mb-4 ">
          <Suspense v-if="board">
            <DraggableLists v-model="board.lists" />
          </Suspense>
          <div class="min-w-[350px] mt-3">
            <v-btn text="Add a new list" color="list" class="flex w-[272px] font-bold justify-start text-start rounded "
              height="60" rounded="lg" v-if="!showAddList" @click="() => showAddList = true" variant="flat" elevation="1">
              <template v-slot:prepend>
                <Icon icon="ph:plus" class=""></Icon>
              </template>
            </v-btn>
            <v-card color="list" rounded="lg" class="w-[272px]" v-else ref="newTarget" @keypress.enter="addList()"
              @keydown.esc="showAddList = false">
              <div class="px-2 py-2">
                <v-text-field autofocus placeholder="List name" hide-details v-model="newListName">
                </v-text-field>
                <div class="space-x-2 mt-3">
                  <v-btn color="primary" class="" :disabled="newListName.length === 0 || isAddingListLoading"
                    :loading="isAddingListLoading" @click="() => addList()">
                    Add list
                  </v-btn>
                  <v-btn variant="text" class="" icon size="35" @click="() => showAddList = false">
                    <Icon icon="ph:x"></Icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>

      <!-- Board Settings  -->
      <v-navigation-drawer v-if="boardCopy" location="right" temporary v-model="boardSettingsDialog" width="500">
        <v-list v-if="isAdmin">
          <BoardSettings :workspaceAllMembers v-model="boardSettingsDialog" :board="board" @success="() => success()" />
        </v-list>
        <v-list v-else>
          <BoardInfo :board />
        </v-list>
      </v-navigation-drawer>


      <v-dialog transition="dialog-bottom-transition" class="md:max-w-[90vw] w-full mx-auto" v-model="isActive"
        :close-on-back="false" persistent>
        <Suspense>
          <CardDetails />
          <template #fallback>
            <v-card class="2xl:w-[35vw] min-h-[60vh] xl:w-[50vw] w-full mx-auto flex justify-center items-center">
              <v-card-text class="mx-auto justify-center flex items-center ">
                <v-progress-circular color="primary" indeterminate="disable-shrink" size="50"
                  width="5"></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
        </Suspense>
      </v-dialog>
      <DangerDeleteModal :is-loading="isLoading" v-model="deleteBoardDialog" :name="board?.name" @delete="deleteBoard" />
    </v-main>
  </div>
</template>

<style scoped>
/* :deep(.v-field__input) { */
/*   font-size: 1.25rem !important; */
/*   padding: 0.5rem !important; */
/*   margin: 0 !important; */
/* } */

:deep(.dp__input) {
  border-radius: 8px !important;
}

:deep(.dp__main) {
  width: 100%;
}

:deep(.dp__outer_menu_wrap) {
  width: 100%;
}

.v-divider {
  opacity: 20%;
}
</style>
<style>
@import url('../assets/override.css');
</style>
