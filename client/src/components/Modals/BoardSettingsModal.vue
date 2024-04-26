<script setup>
import { Icon } from "@iconify/vue"
import { useDisplay } from "vuetify";
import { getAllWorkspaceMembers, getWorkspace } from "../../composables/utils";
import axios from "axios";
import { useToast } from "vue-toastification";
import { socket } from "../../composables/socket";
import axiosInstance from "../../composables/axios";
const props = defineProps({
  board: Object
})
const emits = defineEmits(["success", "close"]);
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const toast = useToast();
const { lgAndUp } = useDisplay();
const workspace = getWorkspace(props.board.workspace);

let members = getAllWorkspaceMembers(props.board.workspace);

const updateBoard = () => {
  axiosInstance.put(`/b/${props.board.id}`,
    props.board,
    { withCredentials: true }).then((res) => {
      console.log(res);
      socket.emit("update-lists", route.params.boardId);
      emits("success");
    }).catch((err) => {
      console.log(err)
    });
}

</script>
<template>
  <v-card class="self-center h-full md:w-2/3 overflow-y-auto" rounded="lg">
    <div class="absolute right-3 top-3">
      <v-btn @click="() => $emit('close')" size="x-small" icon variant="text">
        <Icon icon="ph:x" width="25" class="text-white" />
      </v-btn>
    </div>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card-title>
          <h1 class="text-3xl">Add new board</h1>
          <p class="py-2"></p>
        </v-card-title>
        <v-card-text class="">
          <v-text-field v-model="board.name" label="Board name"></v-text-field>
          <div class="pb-5">
            <p>Background color</p>

            <v-btn-toggle v-model="board.backgroundColor" mandatory variant="flat" class="sapce-x-2 gap-2 py-2">
              <v-btn color="" value="#86efac" style="background-color: #86efac">
                <Icon color="white" v-if="board.backgroundColor == '#86efac'" width="25" icon="ph:check-bold" />
              </v-btn>
              <v-btn color="" value="#c4b5fd" style="background-color: #c4b5fd">
                <Icon color="white" v-if="board.backgroundColor == '#c4b5fd'" width="25" icon="ph:check-bold" />
              </v-btn>
              <v-btn color="" value="#93c5fd" style="background-color: #93c5fd">
                <Icon color="white" v-if="board.backgroundColor == '#93c5fd'" width="25" icon="ph:check-bold" />
              </v-btn>
              <v-btn color="" value="#fda4af" style="background-color: #fda4af">
                <Icon color="white" v-if="board.backgroundColor == '#fda4af'" width="25" icon="ph:check-bold" />
              </v-btn>
              <v-btn color="primary" value="default" variant="outlined">
                <p class="text-primary">Default</p>
                <Icon color="black" v-if="board.backgroundColor == '#fff'" width="25" icon="ph:check-bold" />
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-radio-group v-model="board.isPrivate">
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
          <v-select v-model="board.members" multiple v-if="board.isPrivate" :items="members" label="members"
            item-title="name" item-value="id">
          </v-select>
          <v-textarea v-model="board.description" label="Board description"></v-textarea>
          <v-btn @click="updateBoard" color="primary" class="w-full">Update</v-btn>
        </v-card-text>
      </v-col>
      <v-col v-if="lgAndUp" cols="12" md="6" class="bg-darkPrimary">
        <v-row class="justify-center items-center h-full my-auto mx-auto w-full">
          <v-col cols="1"></v-col>
          <v-col cols="10" class="h-[50%] rounded-lg max-h-[220px]" { backgroundColor: board.backgroundColor } ">
                  <v-row class=" h-full my-auto mx-auto space-x-3">
            <v-col class="h-full my-auto rounded-lg" :style="{ backgroundColor: 'rgb(var(--v-theme-list))' }">
              <v-row>
                <v-col cols="12" class="my-auto mx-auto space-y-3">
                  <v-card color="card" v-for="i in 3" class="min-h-[40px]">
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
                  <v-card color="card" v-for="i in 1" class="min-h-[40px]">
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
                  <v-card color="card" v-for="i in 2" class="min-h-[40px]">
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
