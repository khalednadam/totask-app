<script setup></script>
<template>
  <div class="mt-10">
    <v-row>
      <v-col>
        <div class="flex flex-col gap-3 justify-center items-center">
          <h1 class="text-center text-3xl">Board not found</h1>
          <p class="md:w-2/6 w-full mx-auto text-center">
            This board may be private. If someone gave you this link, they may
            need to invite you to their Workspace.
          </p>
          <router-link to="/">
            <v-btn color="primary" class="w-max"> Home </v-btn>
          </router-link>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
