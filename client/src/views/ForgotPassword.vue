<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue"
import axiosInstance from "../composables/axios";
import { toastError } from "@/composables/helper.js"

const router = useRouter();
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
const goback = () => router.go(-1);


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
    <div class="flex flex-col gap-5">
      <v-btn @click="goback" icon variant="tonal" size="small" color="primary" class="">
        <icon icon="ph:caret-left" class="text-primary" width="25" />
      </v-btn>
      <div>
        <h1 class="text-7xl mb-10 text-primary">Forgot Password</h1>
      </div>
    </div>
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
