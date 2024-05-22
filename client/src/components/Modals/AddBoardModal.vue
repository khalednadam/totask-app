<script setup>
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useDisplay } from "vuetify";
import {
  getAllWorkspaceMembers,
  getMyAdminWorkspaces,
  getWorkspace,
  // getWorkspaceMembers,
} from "../../composables/utils";
import { useToast } from "vue-toastification";
import axiosInstance from "../../composables/axios";


const toast = useToast();

const props = defineProps({
  workspace: String,
  members: Array,
  boards: Array,
});

const { lgAndUp } = useDisplay();

// PROPS & EMITS
const emit = defineEmits(["toggleModal"]);

// if it is being activated from outside of the workspace (workspace is not known)
const chosenWorkspace = ref(undefined);
const chosenWorkspaceMembers = ref([]);
const chosenWorkspacePrivateMembers = ref([]);
// const workspace = ref();

// if the workspace being passed as props from the workspace
const boardBackgroundColor = ref("");
const boardDescription = ref("");
const boardName = ref("");
const isPrivate = ref(false);
const privateMembers = ref([]);
const isLoading = ref(false);
let members = [];
if (props.workspace) {
  members = getAllWorkspaceMembers(props.workspace);
}
const workspaces = ref(getMyAdminWorkspaces());
watch(isPrivate, () => {
  if (isPrivate.value === false) {
    privateMembers.value = [];
    chosenWorkspacePrivateMembers.value = [];
  }
});
// watch(chosenWorkspace, () => {
//   if (chosenWorkspace.value) {
//     chosenWorkspaceMembers.value = getWorkspace(chosenWorkspace.value);
//     // chosenWorkspaceMembers.value = getWorkspaceMembers(
//     //   chosenWorkspace.value.id
//     // );
//   }
// });
const addBoard = () => {
  isLoading.value = true;
  axiosInstance
    .post(
      `/b/create`,
      {
        name: boardName.value,
        workspace: props.workspace || chosenWorkspace.value?._id,
        backgroundColor: boardBackgroundColor.value,
        description: boardDescription.value,
        isPrivate: isPrivate.value,
        members: privateMembers.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("Board was added to the workspace");
      emit("AddBoard", res.data);
      emit("toggleModal");
    })
    .catch((err) => {
      toast.error("An error occurred")
    }).finally(() => {
      isLoading.value = false;
    })
};
</script>
<template>
  <v-card scrollable class="self-center h-full md:w-2/3 overflow-y-auto" rounded="lg">
    <v-card-title>
      <h1 class="text-3xl">Add new board</h1>
    </v-card-title>
    <div class="absolute right-3 top-3">
      <v-btn @click="() => $emit('toggleModal')" size="x-small" icon variant="text">
        <Icon icon="ph:x" width="25" />
      </v-btn>
    </div>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card-text class="">
          <v-text-field v-model="boardName" label="Board name"></v-text-field>
          <v-autocomplete v-if="!workspace" label="workspace" :items="workspaces" item-title="name"
            v-model="chosenWorkspace" return-object>
          </v-autocomplete>
          <div class="pb-5">
            <p>Background color</p>
            <div class="w-full">
              <v-color-picker class="min-w-full" v-model="boardBackgroundColor" hide-canvas
                :modes="['rgb', 'hsl', 'hex']" show-swatches></v-color-picker>
            </div>
            <!-- <v-btn-toggle v-model="boardBackgroundColor" mandatory variant="flat" class="sapce-x-2 gap-2 py-2"> -->
            <!--   <v-btn color="" value="#86efac" style="background-color: #86efac"> -->
            <!--     <Icon color="white" v-if="boardBackgroundColor == '#86efac'" width="25" icon="ph:check-bold" /> -->
            <!--   </v-btn> -->
            <!--   <v-btn color="" value="#c4b5fd" style="background-color: #c4b5fd"> -->
            <!--     <Icon color="white" v-if="boardBackgroundColor == '#c4b5fd'" width="25" icon="ph:check-bold" /> -->
            <!--   </v-btn> -->
            <!--   <v-btn color="" value="#93c5fd" style="background-color: #93c5fd"> -->
            <!--     <Icon color="white" v-if="boardBackgroundColor == '#93c5fd'" width="25" icon="ph:check-bold" /> -->
            <!--   </v-btn> -->
            <!--   <v-btn color="" value="#fda4af" style="background-color: #fda4af"> -->
            <!--     <Icon color="white" v-if="boardBackgroundColor == '#fda4af'" width="25" icon="ph:check-bold" /> -->
            <!--   </v-btn> -->
            <!--   <v-btn color="primary" value="default" variant="outlined"> -->
            <!--     <p class="text-primary">Default</p> -->
            <!--     <Icon color="black" v-if="boardBackgroundColor == '#fff'" width="25" icon="ph:check-bold" /> -->
            <!--   </v-btn> -->
            <!-- </v-btn-toggle> -->
          </div>
          <v-radio-group v-model="isPrivate">
            <v-radio label="Public" :value="false" class="py-2">
              <template #label>
                <div>
                  <h3 class="text-xl font-bold">Public</h3>
                  <p>
                    All members in the workspace can view this board and
                    contribute to it
                  </p>
                </div>
              </template></v-radio>
            <v-radio label="Private" :value="true" class="py-2">
              <template #label>
                <div>
                  <h3 class="text-xl font-bold">Private</h3>
                  <p>
                    Only members added to the board can view this board and
                    contribute to it
                  </p>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-select v-model="privateMembers" multiple v-if="isPrivate && workspace" :items="workspace.members"
            label="members" item-title="name" item-value="id">
          </v-select>
          <v-select :key="chosenWorkspace" v-model="chosenWorkspacePrivateMembers" multiple
            v-if="isPrivate && !workspace" :items="chosenWorkspace?.members" label="members" item-title="name"
            item-value="id">
          </v-select>
          <v-textarea v-model="boardDescription" label="Board description"></v-textarea>
          <v-btn @click="addBoard" color="primary" :loading="isLoading" :disabled="isLoading"
            class="w-full">Create</v-btn>
        </v-card-text>
      </v-col>
      <v-col v-if="lgAndUp" cols="12" md="6" class="">
        <v-row class="justify-center items-center h-full my-auto mx-auto w-full">
          <v-col cols="1"></v-col>
          <v-col cols="10" class="h-[50%] rounded-lg max-h-[220px]" :style="boardBackgroundColor !== 'default'
            ? { backgroundColor: boardBackgroundColor }
            : { backgroundColor: 'rgb(var(--v-theme-background))' }
            ">
            <v-row class="h-full my-auto mx-auto space-x-3">
              <v-col class="h-full my-auto rounded-lg" :style="{ backgroundColor: 'rgb(var(--v-theme-list))' }">
                <v-row>
                  <v-col cols="12" class="my-auto mx-auto space-y-3">
                    <v-card v-for="i in 3" class="min-h-[40px]">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" class="space-y-2">
                            <div class="w-1/2 h-1 bg-gray-400 rounded-full"></div>
                            <div class="w-full h-1 bg-gray-400 rounded-full opacity-40"></div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="h-full my-auto rounded-lg" :style="{ backgroundColor: 'rgb(var(--v-theme-list))' }">
                <v-row>
                  <v-col cols="12" class="my-auto mx-auto space-y-3">
                    <v-card v-for="i in 1" class="min-h-[40px]">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" class="space-y-2">
                            <div class="w-1/2 h-1 bg-gray-400 rounded-full"></div>
                            <div class="w-full h-1 bg-gray-400 rounded-full opacity-40"></div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="h-full my-auto rounded-lg" :style="{ backgroundColor: 'rgb(var(--v-theme-list))' }">
                <v-row>
                  <v-col cols="12" class="my-auto mx-auto space-y-3">
                    <v-card v-for="i in 2" class="min-h-[40px]">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" class="space-y-2">
                            <div class="w-1/2 h-1 bg-gray-400 rounded-full"></div>
                            <div class="w-full h-1 bg-gray-400 rounded-full opacity-40"></div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
