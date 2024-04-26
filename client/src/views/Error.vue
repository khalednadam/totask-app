<script setup>
</script>
<template>
  <div class="flex flex-col gap-2 w-full h-screen items-center justify-center">
    <h1 class="text-7xl">
      404
    </h1>
    <p>
      This page doesn't exist
    </p>
    <div class="flex justify-center items-center gap-2">
      <router-link to="/">
        <v-btn color="primary">
          Home
        </v-btn>
      </router-link>
    </div>
  </div>
</template>
