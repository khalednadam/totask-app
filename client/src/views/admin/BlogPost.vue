<script setup>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillEditor } from "@vueup/vue-quill";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axiosInstance from "../../composables/axios";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const blogPostId = ref(route.params.blogPostId);
const isLoading = ref(false);
const post = ref();
const cover = ref([]);

const quill = ref("");
const text = ref("");
const postText = ref(post.text);

const setText = () => {
  // text.value = quill.value.getText()
};
const getPostById = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/blog/${blogPostId.value}`, {
      withCredentials: true,
    });
    post.value = response.data;
    postText.value = post.value.text;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => router.go(-1);

onMounted(async () => {
  await getPostById();
  post.text = postText.value;
});

const updatePost = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.put(
      `/blog/${blogPostId.value}`,
      {
        title: post.value.title,
        text: postText.value,
        file: cover.value[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    toast.success("Post updated");
    router.go(-1);
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="my-5">
    <h1 class="my-5">Update a blog post</h1>
    <p v-if="isLoading || !post">
      <v-progress-circular
        color="primary"
        indeterminate="disable-shrink"
        size="16"
        width="2"
      ></v-progress-circular>
    </p>
    <div v-else>
      <v-text-field v-model="post.title" label="Title"> </v-text-field>
      <v-file-input
        variant="outlined"
        label="Cover"
        density="compact"
        v-model="cover"
      >
      </v-file-input>
      <QuillEditor
        ref="quill"
        toolbar="essential"
        v-model:content="postText"
        @text-change="setText"
        contentType="html"
        theme="snow"
      />
      <div class="mt-5 gap-2 flex justify-end">
        <v-btn variant="outlined" color="primary" @click="goBack">
          Cancel
        </v-btn>
        <v-btn
          @click="updatePost"
          flat
          color="primary"
          :disabled="isLoading"
          :loading="isLoading"
        >
          Update
        </v-btn>
      </div>
    </div>
  </div>
</template>
