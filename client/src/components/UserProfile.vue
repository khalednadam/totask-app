<script setup>
import { ref } from 'vue';
import UserAvatar from './UserAvatar.vue';

defineProps({
  member: Object
})
const userInfo = ref(false);
</script>
<template>
  <!-- <v-menu v-model="userInfo" :close-on-content-click="false" location="end"> -->
  <!-- <template v-slot:activator="{ props }"> -->
  <v-list-item v-bind="props" :title="member.name" :subtitle="'@' + member.username">
    <template #prepend>
      <UserAvatar :user="member" />
    </template>
    <template #append>
      <slot></slot>
    </template>
  </v-list-item>
</template>
    <!-- <v-card min-width="300"> -->
      <!-- <div class="w-full h-20 bg-primary"> -->
      <!-- </div> -->
      <!-- <v-card-text> -->
        <!-- <div class="flex gap-2 items-center"> -->
        <!--   <UserAvatar :user="member" size="large" /> -->
        <!--   <div class="flex flex-col justify-start"> -->
        <!--     <p class="text-lg"> -->
        <!--       {{ member.name }} -->
        <!--     </p> -->
        <!--     <p class="opacity-80"> -->
        <!--       @{{ member.username }} -->
        <!--     </p> -->
        <!--   </div> -->
        <!-- </div> -->
      <!-- </v-card-text> -->
    <!-- </v-card> -->
  <!-- </v-menu> -->
<!-- </template> -->
