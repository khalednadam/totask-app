<script setup>
import UserAvatar from "./UserAvatar.vue";

defineProps({
  member: Object,
});
</script>
<template>
  <v-list-item :title="member.name" :subtitle="'@' + member.username">
    <template #prepend>
      <UserAvatar :user="member" />
    </template>
    <template #append>
      <slot></slot>
    </template>
  </v-list-item>
</template>
