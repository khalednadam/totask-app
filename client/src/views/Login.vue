<script setup>
// IMPORTS
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { Icon } from "@iconify/vue";
import { useCurrentUser } from "../stores/auth";
import axiosInstance from "../composables/axios";
import { useToast } from "vue-toastification";
import { toastError } from "../composables/helper.js"

// INITS
const router = useRouter();
const authStore = useCurrentUser();
const toast = useToast();

const rules = [
  value => !!value || 'Required.',
  value => (value && value.length >= 8) || 'Min 8 characters',
  value => (/\d/.test(value) && /[a-zA-Z]/.test(value)) || 'Password must contain at least one letter and one number'
]
// FORM VALIDATION
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    password(value) {
      if (value?.length >= 2) {
        return true;
      } else {
        return "Please enter a valid password";
      }
    },
    email(value) {
      // todo: check the regex 
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value)) return true;
      return "Please enter a valid email";
    },
  },
});

// FIELDS
const email = useField("email");
const password = useField("password");
const passwordField = ref();

// REFS
const showPassword = ref(false);
const sessionID = ref();
const isLoading = ref(false);

// LOGIN FUNCTION
const login = handleSubmit(async () => {
  isLoading.value = true;
  axiosInstance
    .post(
      `/auth/login`,
      {
        email: email.value.value,
        password: password.value.value,
      }
    )
    .then((res) => {
      sessionID.value = res.session;
      authStore.getUser();
      router.push("/");
    })
    .catch((err) => {
      toastError(err);
    }).finally(() => {
      isLoading.value = false;
    })
});

const goback = () => router.go(-1);

</script>

<template>
  <div>
    <div class="flex flex-col gap-5">
      <v-btn @click="goback" icon variant="tonal" size="small" color="primary" class="">
        <icon icon="ph:caret-left" class="text-primary" width="25" />
      </v-btn>
      <div>
        <h1 class="text-7xl mb-10 text-primary">Login</h1>
      </div>
    </div>
    <v-form class="my-auto flex flex-col">
      <div>
        <p>Email</p>
      </div>
      <v-text-field autofocus @keydown.enter="() => passwordField.focus()" v-model="email.value.value"
        :error-messages="email.errorMessage.value"></v-text-field>
      <div class="w-full flex justify-between">
        <p>Password</p>
        <router-link to="/forgot-password">
          <p class="cursor-pointer">forgot your passowrd?</p>
        </router-link>
      </div>
      <v-text-field :rules="rules" @keydown.enter="login" ref="passwordField"
        :error-messages="password.errorMessage.value" v-model="password.value.value"
        :type="showPassword ? 'text' : 'password'">
        <template #append-inner>
          <Icon @click="() => (showPassword = !showPassword)" icon="ph:eye-closed-bold" width="30"
            class="cursor-pointer" v-if="showPassword" />
          <Icon @click="() => (showPassword = !showPassword)" icon="ph:eye-bold" width="30" class="cursor-pointer"
            v-else />
        </template>
      </v-text-field>
      <div>
        <p>
          Don't have an account?
          <span class="underline cursor-pointer">
            <router-link to="/register"> Create one </router-link>
          </span>
        </p>
      </div>
      <v-btn class="self-end" @click="() => login()" variant="tonal" color="primary" :loading="isLoading"
        :disabled="isLoading">
        Login
      </v-btn>
    </v-form>
  </div>
</template>
