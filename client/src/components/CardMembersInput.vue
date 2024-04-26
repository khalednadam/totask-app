<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import UserAvatar from "./UserAvatar.vue";
import axios from "axios";
import { socket } from "../composables/socket";
import axiosInstance from "../composables/axios";
const assignees = defineModel();
const props = defineProps({
  cardId: String,
  members: Array,
  mini: Boolean,
});
const emit = defineEmits(["updateCardAssignees", "updateCard"]);
const membersMenu = ref(false);

const updateCardAssignees = () => {
  axiosInstance
    .put(
      `/card/assignees/${props.cardId}`,
      {
        assignees: assignees.value.map((assignee) => assignee.id),
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      membersMenu.value = false;
      emit("updateCard", res.data);
      socket.emit("update-card", props.cardId);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-menu v-model="membersMenu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="mini"
        icon
        rounded="full"
        color="onbackground"
        :size="32"
        v-bind="props"
        class="w-full"
        variant="tonal"
      >
        <icon icon="ph:plus" />
      </v-btn>
      <v-btn v-else v-bind="props" class="w-full" variant="tonal">
        <template v-slot:prepend>
          <icon icon="ph:user" width="20" />
        </template>
        Members
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-autocomplete
          v-model="assignees"
          :items="members"
          chips
          closable-chips
          item-title="name"
          return-object
          label="Assignees"
          multiple
        >
          <template v-slot:chip="{ props, item }">
            <v-chip v-bind="props" :text="item.raw.name">
              <template v-slot:prepend>
                <UserAvatar :user="item.raw" />
              </template>
            </v-chip>
          </template>

          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.raw.name"
              :subtitle="item.raw.username"
            >
              <template v-slot:prepend>
                <UserAvatar :user="item.raw" />
              </template>
            </v-list-item>
          </template>
        </v-autocomplete>
        <div class="flex justify-end gap-2">
          <v-btn
            color="primary"
            variant="outlined"
            @click="membersMenu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="
              () => {
                updateCardAssignees();
                membersMenu = false;
              }
            "
          >
            Save
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
