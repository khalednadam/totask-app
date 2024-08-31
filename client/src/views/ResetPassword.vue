<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue";
import axiosInstance from "../composables/axios";

const route = useRoute();
const router = useRouter();

const toast = useToast();
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
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
  },
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
// FIELDS
const password = useField("password");
const confirmPassword = useField("confirmPassword");
const token = ref(route.query.token);

const resetPassword = handleSubmit(async () => {
  axiosInstance
    .post(
      `/auth/reset-password`,
      {
        password: password.value.value,
      },
      {
        params: {
          token: token.value,
        },
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("Password was reset successfully");
      router.push("/login");
    })
    .catch((err) => {
      toast.error("Resetting password failed");
    });
});
</script>
<template>
  <div>
    <h1 class="text-7xl mb-10 text-primary">Reset Passowrd</h1>
    <v-form class="my-auto flex flex-col" @submit.prevent="resetPassword">
      <div>
        <p>New password</p>
      </div>
      <v-text-field
        autofocus
        :error-messages="password.errorMessage.value"
        v-model="password.value.value"
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
      <div>
        <p>New password confirmation</p>
      </div>
      <v-text-field
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
      <v-btn
        class="self-end"
        @click="resetPassword"
        variant="tonal"
        :loading="isSubmitting"
        color="primary"
      >
        Submit
      </v-btn>
    </v-form>
  </div>
</template>
