<script setup>
import { useDisplay } from "vuetify";
import Join from "../../components/Landing/Join.vue";
import { ref } from "vue";
import FeatureTabs from "../../components/Landing/FeatureTabs.vue";
const { mdAndUp } = useDisplay();
const tab = ref(null);
const primaryButtonHoverd = ref(false);
</script>
<template>
  <div>
    <div class="flex justify-center items-center">
      <v-img
        src="/logo-glass.svg"
        class="!absolute z-0 opacity-15 left-0 right-0 justify-self-center -mt-20"
        height="600"
        width="1900"
      ></v-img>
      <div
        class="w-full h-[60vh] my-20 flex md:flex-row justify-center items-center"
      >
        <div
          class="w-full flex items-center gap-5 justify-center flex-col z-50"
        >
          <h1 class="text-5xl md:max-w-[90%] font-light text-center">
            Streamline your
            <span class="text-primary font-semibold"> workflow </span> and
            collaborate
            <span class="text-primary font-semibold"> seamlessly </span> with
            your team.
          </h1>
          <p class="text-center text-2xl">Keep everthing under one roof.</p>
          <div class="mt-3">
            <router-link to="/register">
              <div class="relative group">
                <div
                  class="bg-gradient-to-r from-darkPrimary via-primary to-[#FFEA00] blur-md absolute -inset-0.5 rounded-lg group-hover:blur-sm group-hover:inset-0 transition-all duration-1000 animate-tilt"
                ></div>
                <v-btn
                  color="white"
                  variant="text"
                  class="bg-white black"
                  flat
                  size="x-large"
                >
                  <p class="text-black">Get started</p>
                </v-btn>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="my-20">
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="primary" variant="flat">
            <v-img src="/tasks.svg" height="200" class="m-10"></v-img>
            <v-card-title>
              <h1>Streamline Task Chaos.</h1>
            </v-card-title>
            <v-card-text class="md:w-2/3">
              Effortlessly organize and prioritize tasks, avoiding the clutter
              and confusion with totask. Stay focused, productive, and in
              control of your workflow.
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="secondary" variant="flat">
            <v-card-title>
              <h1>Attach Files, Clear Tasks.</h1>
            </v-card-title>
            <v-card-text class="md:w-2/3">
              Seamlessly attach relevant documents, images, or other files
              directly to tasks for easy reference and collaboration.
            </v-card-text>
            <v-img src="/attachments.svg" height="200" class="m-10"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <FeatureTabs />
    </div>
    <!-- <div class="space-y-2 my-20 items-start gap-5 justify-between"> -->
    <!--   <v-row> -->
    <!--     <v-col cols="12" md="6"> -->
    <!--       <div class="flex flex-col gap-5"> -->
    <!--         <h2 class="text-4xl"> -->
    <!--           Unleash Your Productivity -->
    <!--         </h2> -->
    <!--         <p class=""> -->
    <!--           Unleash productivity with totask. Seamlessly blend simplicity, flexibility, and -->
    <!--           power -->
    <!--           to turn chaos into clarity. Easily navigate boards, lists, and cards for clear insights into your team's -->
    <!--           actions. -->
    <!--           Dive into our guide for streamlined efficiency. -->
    <!--         </p> -->
    <!--       </div> -->
    <!--     </v-col> -->
    <!--     <v-col cols="12" md="6"> -->

    <!--       <div class="flex justify-center gap-2 items-start w-full"> -->
    <!--         <div class="bg-primary/50 p-2 rounded-lg w-full"> -->
    <!--           <v-img src="/in-app.webp" rounded="lg" max-height="375"> -->
    <!--           </v-img> -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </v-col> -->
    <!--   </v-row> -->
    <!-- </div> -->
    <div class="my-20">
      <Join />
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
