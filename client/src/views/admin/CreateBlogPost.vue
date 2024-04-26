<script setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill'
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import axiosInstance from '../../composables/axios';


const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const toast = useToast();
const router = useRouter();

const title = ref("");
const cover = ref();
const bodyText = ref("")
const quill = ref("")
const text = ref("")
const isLoading = ref(false);
// set the quill text
const setText = () => {
  text.value = quill.value.getText()
}
const createPost = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.post(`/blog/create`, {
      title: title.value,
      text: bodyText.value,
      file: cover.value[0]
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })
    toast.success("Post created");
    router.go(-1);
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
const goBack = () => router.go(-1);
</script>
<template>
  <h1 class="my-5">
    Create a new blog post
  </h1>
  <v-text-field label="Title" v-model="title">
  </v-text-field>
  <v-file-input variant="outlined" label="Cover" density="compact" v-model="cover">
  </v-file-input>
  <QuillEditor ref="quill" toolbar="essential" v-model:content="bodyText" @text-change="setText" contentType="html"
    theme="snow" />
  <div class="mt-5 gap-2 flex justify-end">
    <v-btn variant="outlined" color="primary" @click="goBack">
      Cancel
    </v-btn>
    <v-btn flat color="primary" :disabled="isLoading" :loading="isLoading" @click="createPost">
      Create
    </v-btn>
  </div>
</template>
