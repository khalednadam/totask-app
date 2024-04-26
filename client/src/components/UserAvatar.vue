<script setup>
const props = defineProps({
  user: Object,
  size: String
})
</script>
<template>
  <v-avatar class="" :size="size || 'small'" color="primary"
    v-if="user.profilePhotoUrl === null || !user.profilePhotoUrl">
    {{ user.name[0].toUpperCase() }}
  </v-avatar>
  <v-avatar class="" size="small" color="primary" v-else>
    <v-img :src="user.profilePhotoUrl"> </v-img>
  </v-avatar>
</template>
