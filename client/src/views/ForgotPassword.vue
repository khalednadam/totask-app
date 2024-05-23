<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue"
import axiosInstance from "../composables/axios";
import { toastError } from "@/composables/helper.js"

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const toast = useToast();
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    email(value) {
      // todo: check the regex 
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value)) return true;
      return "Please enter a valid email";
    },
  },
});

// FIELDS
const email = useField("email");


const sendPasswordEmail = handleSubmit(async () => {
  isSubmitting.value = true;
  axiosInstance
    .post(
      `/auth/forgot-password`,
      {
        email: email.value.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      toast.success("Email was sent");
      email.value.value = "";
    })
    .catch((err) => {
      toastError(err);
    }).finally(() => {
      isSubmitting.value = false;
    })
});
</script>
<template>
  <div>
    <h1 class="text-7xl mb-10 text-primary">Forgot Passowrd</h1>
    <v-form class="my-auto flex flex-col" @submit.prevent="sendPasswordEmail">
      <div>
        <p>Email</p>
      </div>
      <v-text-field autofocus v-model="email.value.value" :error-messages="email.errorMessage.value"></v-text-field>
      <v-btn class="self-end" @click="sendPasswordEmail" variant="tonal" :loading="isSubmitting" color="primary">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>
