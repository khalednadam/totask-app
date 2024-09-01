import "./assets/main.css";
import axiosInstance from './composables/axios';

import { createApp } from "vue";
import { createDeviceDetector } from "next-vue-device-detector";

import App from "./App.vue";
import router from "./router";

// Axios
import { pinia } from "./pinia";

// Vuetify
import "vuetify/styles";
import vuetify from "./plugins/vuetify";

// Toast Notification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { GlobalEvents } from 'vue-global-events'


const app = createApp(App);
export const device = createDeviceDetector()

// Toast options
const options = {
  position: "bottom-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

app.component('GlobalEvents', GlobalEvents);

app.provide("WORKSPACETYPES", ["Software Development", "Marketing", "Sales"]);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(device);
app.use(Toast, options);
axiosInstance.get('/csrf-token').then(response => {

  app.mount("#app");
}).catch(error => {
  console.error('Failed to fetch CSRF token:', error);
  app.mount("#app");
});
