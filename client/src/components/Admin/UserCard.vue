<script setup>
import UserAvatar from "@/components/UserAvatar.vue";
const props = defineProps({
  user: Object
})

</script>
<template>
  <v-card>
    <v-card-text>
      <div class="flex items-center gap-2">
        <UserAvatar :user="user" />
        <div>
          <h2>
            {{ user.name }}
          </h2>
          <p class="opacity-60 text-xs">
            @{{ user.username }}
          </p>
        </div>
      </div>
      <div>
        <p>
          email: {{ user.email }}
        </p>
        <p>
          registerd on: {{ new Date(user.createdAt).toLocaleString("en-GB", {
            day: "2-digit", month: "short", year:
              "numeric"
          }) }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>
