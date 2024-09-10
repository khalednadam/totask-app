<script setup>
// IMPORTS
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "../stores/auth";
import axiosInstance from "../composables/axios";
import { toastError } from "@/composables/helper.js";

// INITS
const router = useRouter();
const authStore = useCurrentUser();

const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 8) || "Min 8 characters",
  (value) =>
    (/\d/.test(value) && /[a-zA-Z]/.test(value)) ||
    "Password must contain at least one letter and one number",
];
// FORM VALIDATIONS
const { handleSubmit, handleReset, isSubmitting } = useForm({
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
    password(value) {
      if (value?.length >= 2) {
        return true;
      } else {
        return "Please enter a valid password";
      }
    },
    confirmPassword(value) {
      if (value === password.value.value || value?.length < 2) {
        return true;
      } else {
        return "Passwords doesn't match";
      }
    },
    email(value) {
      // TODO: check the regex
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value))
        return true;
      return "Please enter a valid email";
    },
  },
});

// REFS
const sessionID = ref();
const email = useField("email");
const name = useField("name");
const username = useField("username");
const password = useField("password");
const confirmPassword = useField("confirmPassword");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const goback = () => router.go(-1);
// FUNCTIONS
const register = handleSubmit(async () => {
  if (password !== password) {
    return "password not match";
  }
  isLoading.value = true;
  axiosInstance
    .post(
      `/auth/register`,
      {
        name: name.value.value,
        username: username.value.value,
        email: email.value.value,
        password: password.value.value,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "https://totask-server.onrender.com",
        },
      }
    )
    .then((res) => {
      axiosInstance
        .post(
          `/auth/login`,
          {
            email: email.value.value,
            password: password.value.value,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          sessionID.value = res.session;
          authStore.getUser();
          router.push("/");
        })
        .catch((err) => {
          toastError(err);
        });
    })
    .catch((err) => {
      toastError(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
<template>
  <div>
    <div class="flex flex-col gap-5">
      <v-btn
        @click="goback"
        icon
        variant="tonal"
        size="small"
        color="primary"
        class=""
      >
        <Icon icon="ph:caret-left" class="text-primary" width="25" />
      </v-btn>
      <div>
        <h1 class="text-7xl mb-10 text-primary">Register</h1>
      </div>
    </div>

    <v-form class="my-auto flex flex-col">
      <div>
        <p>Name</p>
      </div>
      <v-text-field
        autofocus
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
      ></v-text-field>
      <div>
        <p>Username</p>
      </div>
      <v-text-field
        v-model="username.value.value"
        :error-messages="username.errorMessage.value"
        prefix="@"
      ></v-text-field>
      <div>
        <p>Email</p>
      </div>
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      ></v-text-field>
      <div class="w-full flex justify-between">
        <p>Password</p>
      </div>
      <v-text-field
        :rules="rules"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        :type="showPassword ? 'text' : 'password'"
      >
        <template #append-inner>
          <Icon
            @click="() => (showPassword = !showPassword)"
            icon="ph:eye-closed-bold"
            width="30"
            class="cursor-pointer"
            v-if="showPassword"
          />
          <Icon
            @click="() => (showPassword = !showPassword)"
            icon="ph:eye-bold"
            width="30"
            class="cursor-pointer"
            v-else
          />
        </template>
      </v-text-field>
      <div class="w-full flex justify-between">
        <p>Confirm password</p>
      </div>
      <v-text-field
        :rules="rules"
        v-model="confirmPassword.value.value"
        :error-messages="confirmPassword.errorMessage.value"
        :type="showConfirmPassword ? 'text' : 'password'"
      >
        <template #append-inner>
          <Icon
            @click="() => (showConfirmPassword = !showConfirmPassword)"
            icon="ph:eye-closed-bold"
            width="30"
            class="cursor-pointer"
            v-if="showConfirmPassword"
          />
          <Icon
            @click="() => (showConfirmPassword = !showConfirmPassword)"
            icon="ph:eye-bold"
            width="30"
            class="cursor-pointer"
            v-else
          />
        </template>
      </v-text-field>
      <div>
        <p>
          Already have an account?
          <span class="underline cursor-pointer">
            <router-link to="/login"> Login </router-link>
          </span>
        </p>
      </div>
      <v-btn
        class="self-end"
        @click="register"
        variant="tonal"
        color="primary"
        :loading="isLoading"
        :disabled="isLoading"
      >
        Register
      </v-btn>
    </v-form>
  </div>
</template>
