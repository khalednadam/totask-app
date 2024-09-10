<script setup>
const props = defineProps({
  board: Object
})
</script>
<template>
  <h2 class="text-xl text-center ">
    Board Information
  </h2>
  <v-divider></v-divider>
  <div class="px-4 pt-5 space-y-5">
    <div>
      <p class="text-xl font-bold">Board name</p>
      <p>{{ board.name }}</p>
    </div>
    <div>
      <p class="text-xl font-bold">Board Description</p>
      <p>{{ board.description }}</p>
    </div>
    <div>
      <p class="font-bold text-xl">Privacy:</p>
      <p>
        {{ board.isPrivate ? 'private' : 'public' }}
      </p>
    </div>
  </div>
</template>
