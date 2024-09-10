<script setup>
import { Icon } from "@iconify/vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "../../composables/axios";
import FullDate from "../../components/FullDate.vue";

const route = useRoute();
const router = useRouter();
const blogPostId = ref(route.params.blogPostId);
const isLoading = ref(false);
const post = ref();

const getPostById = async () => {
  isLoading.value = true;
  try {
    const response = await axiosInstance.get(`/blog/${blogPostId.value}`, {
      withCredentials: true,
    });
    post.value = response.data;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => router.go(-1);
onMounted(async () => {
  await getPostById();
});
</script>
<template>
  <div>
    <v-btn
      @click="goBack"
      icon
      variant="tonal"
      size="small"
      color="primary"
      class="!absolute top-20"
    >
      <Icon icon="ph:caret-left" class="text-primary" width="25" />
    </v-btn>
    <p v-if="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate="disable-shrink"
        size="16"
        width="2"
      ></v-progress-circular>
    </p>
    <div class="text-center space-y-5" v-else>
      <FullDate
        :date="post?.createdAt"
        :include-time="false"
        class="text-xs mt-1"
      />
      <h1 class="text-4xl">
        {{ post?.title }}
      </h1>
      <v-img height="450" rounded="large" :src="post?.cover"> </v-img>
      <p v-html="post?.text" class="text-start text-xl md:text-lg"></p>
    </div>
  </div>
</template>
