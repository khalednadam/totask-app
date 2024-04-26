import "./assets/main.css";

import { createApp } from "vue";

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


const app = createApp(App);

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

app.provide("WORKSPACETYPES", ["Software Development", "Marketing", "Sales"]);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Toast, options);
app.mount("#app");
