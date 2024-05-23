<script setup>
import { computed, ref } from "vue";
import { useCurrentUser } from "@/stores/auth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useForm, useField } from "vee-validate";
import { Icon } from "@iconify/vue";
import DeleteModal from "../components/Modals/DeleteModal.vue";
import axiosInstance from "../composables/axios";
import { toastError } from "@/composables/helper.js"

const authStore = useCurrentUser();
const router = useRouter();
const toast = useToast();

const changePasswordDialog = ref(false);
const currentUser = useCurrentUser();
const user = ref({});
const password = ref("");
const confirmPassword = ref("");
const oldPassword = ref("");
const isPasswordMatch = computed(
  () => password.value === confirmPassword.value
);
const showOldPassword = ref(false);
const profilePic = ref();
const changeAvatarDialog = ref(false);
const deleteAvatarDialog = ref(false);
const isLoading = ref(false);
const deleteAccountDialog = ref(false);
const passwordForDeletion = ref("");
const emailVerificationLoading = ref(false);

const isDisabled = computed(() => {
  return password.value.length > 7 &&
    confirmPassword.value.length > 7 &&
    oldPassword.value.length > 7
    ? true
    : false;
});

const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 8) || "Min 8 characters",
  (value) =>
    (/\d/.test(value) && /[a-zA-Z]/.test(value)) ||
    "Password must contain at least one letter and one number",
];

const changePassword = () => {
  axiosInstance
    .post(
      `/auth/change-password`,
      {
        email: email.value.value,
        password: oldPassword.value,
        newPassword: password.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("Password was changed successfully");
      changePasswordDialog.value = false;
    })
    .catch((err) => {
      toastError(err);
    });
};

const { handleSubmit, resetForm, handleReset, isSubmitting, values } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) {
        return true;
      } else {
        return "Please enter your full name";
      }
    },
    username(value) {
      if (
        value?.length >= 2 &&
        /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/i.test(value)
      ) {
        return true;
      } else {
        return "Please enter a valid username";
      }
    },
    email(value) {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value))
        return true;
      return "Please enter a valid email";
    },
  },

  initialValues: {
    name: authStore.user?.name,
    email: user.value.email,
    username: user.value.username,
  },
});

const deleteAccount = () => {
  isLoading.value = true;
  axiosInstance
    .post(
      `/users/${user.value.id}`,
      {
        password: passwordForDeletion.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      deleteAccountDialog.value = false;
      authStore.$reset();
      router.push("/login");
    })
    .catch((err) => {
      toast.error("failed - check your password and try again!");
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const email = useField("email");
const name = useField("name");
const username = useField("username");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const deleteAccountShowPassowrd = ref(false);

onMounted(async () => {
  await currentUser.getUser();
  user.value = { ...authStore.user };
  resetForm({
    values: {
      name: user.value.name,
      username: user.value.username,
      email: user.value.email,
    },
  });
});

const deleteProfilePic = handleSubmit(() => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/users/deleteProfilePic/${user.value.id}`,
      {
        file: null,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("user updated successfully");
      authStore.assignUser(res.data);
      authStore.user = res.data;
      deleteAvatarDialog.value = false;
      profilePic.value = null;
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
});
const updateProfilePic = handleSubmit(() => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/users/${user.value.id}`,
      {
        file: profilePic.value[0] ? profilePic.value[0] : null,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("user updated successfully");
      authStore.assignUser(res.data);
      authStore.user = res.data;
      changeAvatarDialog.value = false;
      profilePic.value = null;
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const updateProfile = handleSubmit(() => {
  isLoading.value = true;
  axiosInstance
    .put(
      `/users/${user.value.id}`,
      {
        name: name.value.value,
        username: username.value.value,
        email: email.value.value,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("user updated successfully");
      authStore.assignUser(res.data);
      authStore.user = res.data;
      changeAvatarDialog.value = false;
      profilePic.value = null;
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const sendVerificationEmail = async () => {
  emailVerificationLoading.value = true;
  try {
    await axiosInstance.post("/auth/send-verification-email");
    toast.success("Verification email was sent");
  } catch (err) {
    toast.error("Something went wrong!");
  } finally {
    emailVerificationLoading.value = false;
  }
};
</script>

<template>
  <h1 class="text-3xl mt-3">Settings</h1>
  <p class="mt-5 text-xl">Account info</p>
  <div class="mt-5">
    <v-form @submit="handleSubmit">
      <v-row class="border-t border-b items-center">
        <v-col md="4" cols="12">
          <p class="text-xl">Profile picture</p>
        </v-col>
        <v-col md="5" cols="12" :key="user">
          <div class="flex gap-10 items-center">
            <v-avatar color="primary" class="" :size="80">
              <p v-if="!user.profilePhotoUrl && user.name" class="text-4xl">
                {{ user.name[0].toUpperCase() }}
              </p>
              <v-img :src="authStore.user?.profilePhotoUrl" v-else></v-img>
            </v-avatar>
            <div class="flex flex-col justify-between items-center gap-2">
              <v-btn v-bind="props" color="primary" @click="changeAvatarDialog = true">Change</v-btn>
              <v-btn color="error" @click="deleteAvatarDialog = true" :disabled="!user.profilePhotoUrl">Delete</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="items-center">
        <v-col md="4" cols="12">
          <p class="text-xl">Full name</p>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field name="name" v-model="name.value.value" :error-messages="name.errorMessage.value"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="items-center">
        <v-col md="4" cols="12">
          <p class="text-xl">username</p>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field v-model="username.value.value" :error-messages="username.errorMessage.value"
            prefix="@"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="items-center">
        <v-col md="4" cols="12">
          <p class="text-xl">Email</p>
        </v-col>
        <v-col md="8" cols="12">
          <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>
          <v-btn :disabled="emailVerificationLoading" :loading="emailVerificationLoading" @click="sendVerificationEmail"
            v-if="!authStore.user.isEmailVerified" color="primary" variant="flat">
            Verify
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="items-center">
        <v-col cols="12" class="flex flex-col justify-end">
          <div class="flex justify-end gap-3">
            <v-btn color="primary" @click="() => router.go(-1)" variant="outlined">Cancel</v-btn>
            <v-btn color="primary" @click="updateProfile">Save</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
    <p class="text-xl">Change password</p>
    <v-divider class="mt-2 border-2 border-black dark:border-white"></v-divider>
    <v-btn @click="changePasswordDialog = true" class="mt-2">
      Change password
    </v-btn>
    <p class="text-xl text-error mt-5">Delete account</p>
    <v-divider class="mt-2 border-2 border-black dark:border-white"></v-divider>
    <v-btn class="mt-2" color="error" @click="deleteAccountDialog = true">
      Delete account
    </v-btn>
  </div>
  <v-dialog v-model="changePasswordDialog" class="md:max-w-[40vw] w-full">
    <v-card>
      <v-card-title> Change password </v-card-title>
      <v-card-text class="space-y-4 flex flex-col">
        <div>
          <p>Current Password</p>
          <v-text-field :rules="rules" v-model="oldPassword" :type="showOldPassword ? 'text' : 'password'">
            <template #append-inner>
              <Icon @click="() => (showOldPassword = !showOldPassword)" icon="ph:eye-closed-bold" width="30"
                class="cursor-pointer" v-if="showOldPassword" />
              <Icon @click="() => (showOldPassword = !showOldPassword)" icon="ph:eye-bold" width="30"
                class="cursor-pointer" v-else />
            </template>
          </v-text-field>
        </div>
        <div>
          <p>New Password</p>
          <v-text-field :rules="rules" v-model="password" :type="showPassword ? 'text' : 'password'">
            <template #append-inner>
              <Icon @click="() => (showPassword = !showPassword)" icon="ph:eye-closed-bold" width="30"
                class="cursor-pointer" v-if="showPassword" />
              <Icon @click="() => (showPassword = !showPassword)" icon="ph:eye-bold" width="30" class="cursor-pointer"
                v-else />
            </template>
          </v-text-field>
        </div>
        <div>
          <p>New Password Confirmation</p>
          <v-text-field :rules="rules" v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'">
            <template #append-inner>
              <Icon @click="() => (showConfirmPassword = !showConfirmPassword)" icon="ph:eye-closed-bold" width="30"
                class="cursor-pointer" v-if="showConfirmPassword" />
              <Icon @click="() => (showConfirmPassword = !showConfirmPassword)" icon="ph:eye-bold" width="30"
                class="cursor-pointer" v-else />
            </template>
          </v-text-field>
        </div>
        <div class="flex justify-end gap-2">
          <v-btn variant="outlined" color="primary" @click="changePasswordDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="changePassword" :disabled="!isPasswordMatch || !isDisabled">
            Change
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="deleteAvatarDialog" class="md:max-w-[50vw] w-full">
    <DeleteModal :is-loading="isLoading" title="Delete Profile Picture" actionBtnText="Delete"
      text="Your profile picture will be deleted" @cancel="deleteAvatarDialog = false" @delete="() => {
        profilePic = null;
        deleteProfilePic();
      }
        " />
  </v-dialog>
  <v-dialog v-model="changeAvatarDialog" class="md:max-w-[50vw] w-full">
    <v-card>
      <v-card-title> Change your profile picture </v-card-title>
      <v-card-text>
        <v-file-input v-model="profilePic" accept="image/*" label="Profile Picture"
          variant="solo-filled"></v-file-input>
      </v-card-text>
      <v-card-actions class="self-end">
        <v-btn variant="outlined" color="primary" @click="changeAvatarDialog = false">
          Cancel
        </v-btn>
        <v-btn @click="updateProfilePic" :disabled="isLoading" :loading="isLoading" variant="flat" color="primary">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="deleteAccountDialog" class="md:max-w-[50vw] w-full">
    <v-card>
      <v-card-title> Delete your account? </v-card-title>
      <v-card-text>
        Are you sure you want to delete you account?
        <v-text-field :type="deleteAccountShowPassowrd ? 'text' : 'password'" class="mt-2" v-model="passwordForDeletion"
          label="password">
          <template #append-inner>
            <Icon @click="() => (deleteAccountShowPassowrd = !deleteAccountShowPassowrd)
              " icon="ph:eye-closed-bold" width="30" class="cursor-pointer" v-if="deleteAccountShowPassowrd" />
            <Icon @click="() => (deleteAccountShowPassowrd = !deleteAccountShowPassowrd)
              " icon="ph:eye-bold" width="30" class="cursor-pointer" v-else />
          </template>
        </v-text-field>
      </v-card-text>
      <v-card-actions class="self-end">
        <v-btn variant="outlined" color="primary" @click="deleteAccountDialog = false">
          Cancel
        </v-btn>
        <v-btn @click="deleteAccount" :disabled="isLoading || passwordForDeletion.length < 1" :loading="isLoading"
          variant="flat" color="error">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
