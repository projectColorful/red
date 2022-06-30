import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import { store } from "./store/store";
app.use(store);

import router from "./router/router";
app.use(router);

//tailwind css
import "./assets/index.css";

app.mount("#app");
