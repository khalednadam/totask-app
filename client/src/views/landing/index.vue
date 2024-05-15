<script setup>
import { useDisplay } from 'vuetify';
const { mdAndUp } = useDisplay();
</script>
<template>
  <div>
    <div class="w-full my-20 flex md:flex-row justify-start items-center">
      <div class="w-full flex items-start gap-5 justify-start flex-col">
        <h1 class="text-5xl md:max-w-[90%] font-light text-start">
          Streamline your <span class="text-primary font-semibold"> workflow </span> and collaborate <span
            class="text-primary font-semibold"> seamlessly
          </span> with your
          team.
        </h1>
        <p class="text-center text-2xl">
          Keep everthing under one roof.
        </p>
        <div class="mt-3">
          <router-link to="/register">
            <v-btn color="primary" size="x-large">
              Get started
            </v-btn>
          </router-link>
        </div>
      </div>
      <v-img src="/hero.svg" rounded="lg" width="350" v-if="mdAndUp">
      </v-img>
    </div>
    <div class="my-20">
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="primary" variant="flat">
            <v-img src="/tasks.svg" height="200" class="m-10"></v-img>
            <v-card-title>
              <h1>
                Streamline Task Chaos.
              </h1>
            </v-card-title>
            <v-card-text class="md:w-2/3">
              Effortlessly organize and prioritize tasks, avoiding the clutter and confusion with totask. Stay focused,
              productive, and in control of your workflow.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="secondary" variant="flat">
            <v-card-title>
              <h1>
                Attach Files, Clear Tasks.
              </h1>
            </v-card-title>
            <v-card-text class="md:w-2/3">
              Seamlessly attach relevant documents, images, or other files directly to tasks for easy
              reference and collaboration.
            </v-card-text>
            <v-img src="/attachments.svg" height="200" class="m-10"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="space-y-2 my-20 items-start gap-5 justify-between">
      <v-row>
        <v-col cols="12" md="6">
          <div class="flex flex-col gap-5">
            <h2 class="text-4xl">
              Unleash Your Productivity
            </h2>
            <p class="">
              Unleash productivity with totask. Seamlessly blend simplicity, flexibility, and
              power
              to turn chaos into clarity. Easily navigate boards, lists, and cards for clear insights into your team's
              actions.
              Dive into our guide for streamlined efficiency.
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6">

          <div class="flex justify-center gap-2 items-start w-full">
            <div class="bg-primary/50 p-2 rounded-lg w-full">
              <v-img src="/in-app.webp" rounded="lg" max-height="375">
              </v-img>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <div class="my-4 w-full relative bg-primary"> -->
    <!--   <div class="my-2"> -->
    <!--     <h3 class=""> -->
    <!--       Some of totask's features -->
    <!--     </h3> -->
    <!--     <p> -->
    <!--       There are more features that you can explore by creating a new free account -->
    <!--     </p> -->
    <!--   </div> -->
    <!--   <v-row class="flex min-h-full h-full"> -->
    <!--     <v-col cols="12" md="4" class="min-h-full"> -->
    <!--       <v-card class=" min-h-full h-full"> -->
    <!--         <v-card-title> -->
    <!--           Real-time updates -->
    <!--         </v-card-title> -->
    <!--         <v-card-text> -->
    <!--           <p> -->
    <!--             Real-time updates in totask ensure that all team members stay synchronized with the -->
    <!--             latest changes, enabling seamless collaboration and immediate visibility into task progress. -->
    <!--           </p> -->
    <!--         </v-card-text> -->
    <!--       </v-card> -->
    <!--     </v-col> -->
    <!--     <v-col cols="12" md="4" class="min-h-full"> -->
    <!--       <v-card class="h-full"> -->
    <!--         <v-card-title> -->
    <!--           Assign members to cards -->
    <!--         </v-card-title> -->
    <!--         <v-card-text> -->
    <!--           <p> -->
    <!--             Effortlessly delegate tasks by assigning specific team members to individual cards within totask, -->
    <!--             streamlining collaboration and ensuring clear accountability. -->
    <!--           </p> -->
    <!--         </v-card-text> -->
    <!--       </v-card> -->
    <!--     </v-col> -->
    <!--     <v-col cols="12" md="4" class="min-h-full"> -->
    <!--       <v-card class="h-full"> -->
    <!--         <v-card-title> -->
    <!--           Private/Public boards -->
    <!--         </v-card-title> -->
    <!--         <v-card-text> -->
    <!--           <p> -->
    <!--             Easily control the visibility and accessibility of your project boards with the option to set them as -->
    <!--             private or public, granting flexibility in managing sensitive information or fostering transparent -->
    <!--             collaboration across your team. -->
    <!--           </p> -->
    <!--         </v-card-text> -->
    <!--       </v-card> -->
    <!--     </v-col> -->
    <!--   </v-row> -->
    <!-- </div> -->
  </div>
</template>
