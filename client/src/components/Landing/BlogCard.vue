<script setup>
import { useCurrentUser } from '@/stores/auth';
const authStore = useCurrentUser();

const fullDateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
const props = defineProps({
  post: Object
})
</script>
<template>
  <v-card elevation="1">
    <v-img :src="post.cover" cover height="200">
    </v-img>
    <v-card-title>
      {{ post.title }}
    </v-card-title>
    <v-card-text class="max-w-full truncate">
      <p class="text-xs mt-1 ">
        {{ new Date(post.createdAt).toLocaleString("en-GB", fullDateOptions) }}
      </p>
    </v-card-text>
    <v-card-actions class="justify-end">
      <router-link :to="authStore.user?.role === 'admin' ? `/admin/blog/${post.id}` : `/home/blog/${post.id}`">
        <v-btn variant="flat" color="primary">
          {{ authStore.user?.role === 'admin' ? 'Edit' : 'Read' }}
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>
