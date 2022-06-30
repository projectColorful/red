import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

import { store } from "./store/store";
app.use(store);

import router from "./router/router";
app.use(router);

// import VueCookies from "vue-cookies";
// app.use(VueCookies);
//
// import _ from "lodash";
// app.use(_)

// import {Axios} from "axios";
// app.use(Axios)

/*
Global Properties
 */
// app.config.globalProperties.$VueCookies = VueCookies;
// app.config.globalProperties.$_ = _;
// app.config.globalProperties.$axios = Axios;

//tailwind css
import "./assets/index.css";

app.mount("#app");
