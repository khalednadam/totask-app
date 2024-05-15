<script setup>
// IMPORTS
import { ref, watchEffect, inject, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "../stores/auth";
import AddMembersDialog from "../components/Modals/AddMemberToWorkspaceModal.vue";
import {
  amIAdmin,
  // getWorkspaceAdmins,
  // getWorkspaceMembers,
  // getWorkspace,
  isUserWorkspaceAdmin
} from "../composables/utils";
import { useToast } from "vue-toastification";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import UserProfile from "../components/UserProfile.vue";
import UserAvatar from "../components/UserAvatar.vue";
import axiosInstance from "../composables/axios";


// GLOBAL
const workspaceTypes = inject("WORKSPACETYPES");


// INITS
const route = useRoute();
const store = useCurrentUser();
const router = useRouter();
const toast = useToast();

// REFS
const accessMenu = ref(false);
const workspaceId = ref(route.params.workspaceId);
const workspace = ref();
const workspaceName = ref();
const workspaceDescription = ref();
const workspaceType = ref();
const nameOfWorkspaceToDelete = ref("");
const deleteWorkspaceDialog = ref(false);
const editWorkspaceDialog = ref(false);
const admins = ref([]);
const members = ref([]);
const addMembersDialog = ref(false);
const isWorkspaceAdmin = ref(false);
const canMemberAddBoards = ref(workspace.canMemberAddBoards);
const memberToRemove = ref(null);
const removeMemberDialog = ref(false);
const isPremium = ref(workspace.isPremium)

// computed
const { isUserAdmin } = isUserWorkspaceAdmin(route.params.workspaceId);

const loading = ref(false);
const premiumDialog = ref(false);
// FUNCTIONS


const premiumFeats = [
  "Unlimited boards",
  "Unlimited members",
  "List colors",
  "And more coming soon.."
];

const requestPremium = async () => {
  loading.value = true;
  try {
    await axiosInstance.post("/premium-request/create", {
      workspace: workspaceId.value,
      user: store.user.id
    })
    workspace.premiumRequested = true;
  } catch (err) {
    // (err);
    console.log(err);
  } finally {
    loading.value = false;
    premiumDialog.value = false;
  }
}

const getWorkspace = (workspaceId) => {
  axiosInstance
    .get(`/w/${workspaceId}`, { withCredentials: true })
    .then((res) => {
      workspace.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteWorkspace = () => {
  if (nameOfWorkspaceToDelete.value === workspace.value.name) {
    axiosInstance
      .delete(`/w/${workspaceId.value.toString()}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Deleted successfully");
        toast.success("Deleted successfully")
        router.push("/")
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const updateWorkspace = async () => {
  console.log(isPremium.value)
  axiosInstance
    .put(`/w/${workspace.value._id.toString()}`, {

      name: workspaceName.value,
      type: workspaceType.value,
      description: workspaceDescription.value,
      isPremium: isPremium.value
    })
    .then(async (res) => {
      editWorkspaceDialog.value = false;
      workspace.value = getWorkspace(workspaceId.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const toggleAbilityToAddBoards = (newCanMemberAddBoards) => {
  axiosInstance
    .put(
      `/w/changeAccess/${workspaceId.value}`,
      {
        canMemberAddBoards: newCanMemberAddBoards,
      },
      { withCredentials: true }
    )
    .then((res) => {
      workspace.value = getWorkspace(workspaceId.value);
      canMemberAddBoards.value = res.data.canMemberAddBoards;
    })
    .catch((err) => {
      console.log(err);
    });
};

const activateRemvoeMemberDialog = (member) => {
  removeMemberDialog.value = true;
  memberToRemove.value = member;
}

const removeMemberFromWorksapce = () => {
  axiosInstance.put(`/w/removeUserFrom/${workspaceId.value}`, {
    userEmail: memberToRemove.value.email
  }, {
    withCredentials: true
  }).then((res) => {
    members.value = members.value.filter((member) => member.id !== res.data.id);
    removeMemberDialog.value = false;
    toast.success("User was removed successfully")
  }).catch((err) => {
    console.log(err)
    toast.error(err.statusText);
  })
}


// LIFE CYCLES
watchEffect(() => {
  if (workspace.value) {
    admins.value = workspace.value.admins;
    members.value = workspace.value.members.filter(member => !admins.value.some(admin => admin.id === member.id))
    workspaceName.value = workspace.value.name;
    workspaceType.value = workspace.value.type;
    workspaceDescription.value = workspace.value.description;
    isWorkspaceAdmin.value = amIAdmin(workspace?.value, store.user?.id);
    if (!isWorkspaceAdmin) {
      router.push("/");
    }
  }
});

watch(removeMemberDialog.value, () => {
  if (!removeMemberDialog.value) {
    memberToRemove.value = null;
  }
})

onMounted(() => {
  getWorkspace(route.params.workspaceId)
  if (!isUserAdmin.value) {
    router.push('/')
  }
})
watch(isUserAdmin, () => {
  if (!isUserAdmin.value) {
    router.push('/')
  }
})

</script>
<template>
  <div v-if="workspace" :key="$route.fullPath">
    <v-row class="items-center" :key="workspaceId">
      <v-col cols="6" md="6">
        <div class="flex items-center py-5 space-x-2">
          <v-avatar color="primary" rounded="lg" size="large" class="w-full">
            <Icon icon="ph:building-office" width="30" />
          </v-avatar>
          <div>
            <h2>{{ workspace.name }}</h2>
            <p class="text-sm" v-if="workspace.isPremium">
              premium
            </p>
          </div>
          <!-- <Icon v-if="workspace.isPremium" icon="ph:crown-simple-fill" color="gold" width="20" /> -->
          <v-tooltip text="More info" :open-delay="1000">
            <template v-slot:activator="{ props }">
              <v-btn variant="text" v-bind="props" icon size="x-small"
                @click="editWorkspaceDialog = !editWorkspaceDialog">
                <Icon icon="ph:pencil-simple-line" width="20"></Icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-col>
      <v-col cols="6" md="6" class="justify-end flex">
        <v-btn color="primary" @click="addMembersDialog = !addMembersDialog">
          Add members
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row :key="workspace.canMemberAddBoards">
      <v-col cols="12">
        <h2 class="text-2xl py-2">Workspace Settings</h2>
        <div class="py-5 space-y-1">
          <h3 class="text-xl">Who can add boards to the workspace?</h3>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="6">
              <p>
                <!-- <Icon icon="" width="20" /> -->
                <span v-if="workspace?.canMemberAddBoards" :key="canMemberAddBoards" class="font-bold">
                  Members and admins
                </span>
                <span v-if="!workspace?.canMemberAddBoards" class="font-bold" :key="canMemberAddBoards">
                  Only admins
                </span>
                can add boards to this workspace
              </p>
            </v-col>
            <v-col cols="12" md="6" class="flex flex-col items-end">
              <v-menu v-model="accessMenu" :key="canMemberAddBoards">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">Change</v-btn>
                </template>
                <v-card>
                  <v-list>
                    <v-list-item @click="toggleAbilityToAddBoards(false)"
                      :disabled="workspace.canMemberAddBoards == false">
                      <p class="flex items-center gap-2">
                        <Icon v-if="!workspace.canMemberAddBoards" icon="ph:check" width="20" />
                        Only admins
                      </p>
                    </v-list-item>
                    <v-list-item @click="toggleAbilityToAddBoards(true)" :disabled="workspace.canMemberAddBoards == true">
                      <p class="flex items-center gap-2">
                        <Icon v-if="workspace.canMemberAddBoards" icon="ph:check" width="20" />
                        Members and admins
                      </p>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </div>
        <div class="py-5">
          <h3 class="text-xl">workspace admins</h3>
          <v-divider></v-divider>
          <v-list bg-color="transparent">
            <v-list-item v-for="admin in admins" :key="admin.id" :title="admin.name" :subtitle="'@' + admin.username">
              <template #prepend>
                <UserAvatar :user="admin" />
              </template>
            </v-list-item>
          </v-list>
        </div>
        <div class="py-5">
          <h3 class="text-xl">workspace members</h3>
          <v-divider></v-divider>
          <v-list bg-color="transparent">
            <UserProfile v-for="member in members" :key="member.id" :member>
              <v-btn color="error" @click="() => activateRemvoeMemberDialog(member)">
                Remove from workspace
              </v-btn>
            </UserProfile>
          </v-list>
        </div>
        <div class="flex flex-col w-max">
          <v-btn variant="flat" class="mt-5" color="primary" :loading="loading"
            :disabled="loading || workspace.premiumRequested" @click="() => premiumDialog = true">
            <Icon icon="ph:crown-simple-fill" width="20" />
            Get premium
          </v-btn>
          <v-btn variant="text" class="mt-5" color="error" @click="deleteWorkspaceDialog = !deleteWorkspaceDialog">
            Delete this workspace
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="addMembersDialog">
      <AddMembersDialog :workspaceInfo="workspace" @toggle-modal="() => (addMembersDialog = !addMembersDialog)" />
    </v-dialog>
    <v-dialog v-model="deleteWorkspaceDialog">
      <v-card class="self-center h-full overflow-hidden" rounded="lg">
        <v-row class="max-w-[500px]">
          <v-col cols="12" lg="12" class="">
            <div class="flex justify-between items-center">
              <h1 class="px-5 py-3 text-xl">Delete Workspace?</h1>
              <v-btn @click="() => (deleteWorkspaceDialog = false)" size="x-small" class="right-5" icon variant="text">
                <Icon icon="ph:x" width="25" />
              </v-btn>
            </div>
            <v-card-text>
              <p class="font-bold text-lg">
                Enter the workspace name "{{ workspace.name }}" to delete
              </p>
              <p>Things to know:</p>
              <ul class="decoration-dotted list-disc px-5">
                <li class="decoration-dotted">
                  This is permanent and can't be undone.
                </li>
                <li>
                  All the data related to this workspace will be permanently
                  deleted
                </li>
              </ul>
              <p class="pt-5 pb-1">Enter the workspace name to delete it</p>
              <v-text-field density="compact" v-model="nameOfWorkspaceToDelete">
              </v-text-field>
              <v-btn class="w-full" color="error" :disabled="nameOfWorkspaceToDelete !== workspace.name"
                variant="outlined" @click="deleteWorkspace">delete</v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editWorkspaceDialog" class="md:w-[40vw] w-full">
      <v-card class="self-center h-full overflow-hidden w-full" rounded="lg">
        <v-row class="">
          <v-col cols="12" lg="12" class="">
            <div class="flex justify-between items-center">
              <h1 class="px-5 py-3 text-xl">Edit Workspace</h1>
              <v-btn @click="() => (editWorkspaceDialog = false)" size="x-small" class="right-5" icon variant="text">
                <Icon icon="ph:x" width="25" />
              </v-btn>
            </div>
            <v-card-text>
              <v-text-field label="workspace name" v-model="workspaceName" density="compact"></v-text-field>
              <v-select density="compact" label="Workspace type" :items="workspaceTypes"
                v-model="workspaceType"></v-select>
              <v-textarea label="workspace description" v-model="workspaceDescription" density="compact"></v-textarea>
              <div v-if="workspace.isPremium" class="flex mx-2 mb-5 justify-between items-center">
                <p>
                  Premium workspace
                </p>
                <v-btn color="error" variant="flat" @click="() => isPremium = !isPremium">
                  {{ workspace.isPremium && !isPremium ? 'Remove premium' : 'Cancel' }}
                </v-btn>
              </div>
              <div class="flex justify-end gap-5">
                <v-btn @click="editWorkspaceDialog = false" variant="outlined" color="primary">cancel</v-btn>
                <v-btn variant="flat" color="primary" @click="() => updateWorkspace()">save</v-btn>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="premiumDialog" class="md:max-w-[30vw] w-full">
      <v-card>
        <v-btn variant="text" class="!absolute right-1 top-1 z-50" icon size="35" @click="() => premiumDialog = false">
          <Icon icon="ph:x"></Icon>
        </v-btn>
        <v-img class="align-end text-white" height="120" src="/premiumbg.png" cover>
        </v-img>
        <v-card-title class="text-center">
          Get totask premium
          <p class="text-sm opacity-75 font-bold">
            Get the most out of totask!
          </p>
        </v-card-title>
        <v-card-text>
          <ul class="list-disc flex flex-col items-start mx-auto w-max justify-end">
            <li v-for="feat in premiumFeats">
              {{ feat }}
            </li>
          </ul>
          <v-btn @click="requestPremium" :loading="loading" :disabled="loading || workspace.premiumRequested"
            color="primary" class="w-full mt-5" flat>
            Request totask premium
          </v-btn>
          <v-btn color="primary" class="w-full" variant="text" flat @click="() => premiumDialog = false">
            Cancel
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="removeMemberDialog" width="500">
      <DeleteModal title="Are you sure you want to remove this member?" :text="memberToRemove.name"
        action-btn-text="Remove" @delete="() => removeMemberFromWorksapce()" @cancel="() => removeMemberDialog = false" />
    </v-dialog>
  </div>
</template>
