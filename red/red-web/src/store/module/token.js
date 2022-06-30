import VueCookies from "vue-cookies";
// import {axiosinstance} from "@/services/axiosinstance";

export const token = {
  namespaced: true,
  state: {
    host: process.env.VUE_APP_API,
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    LOGIN_TOKEN(state, payload) {
      VueCookies.set("accessToken", payload.accessToken, 60);
      VueCookies.set("refreshToken", payload.refreshToken, 3600);
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    REFRESH_TOKEN(state, payload) {
      VueCookies.set("accessToken", payload.accessToken, 60);
      VueCookies.set("refreshToken", payload.refreshToken, 3600);
      state.accessToken = payload.accessToken;
    },
    REMOVE_TOKEN() {
      VueCookies.remove("accessToken");
      VueCookies.remove("refreshToken");
    },
  },
  getters: {
    getToken() {
      let accessToken = VueCookies.get("accessToken");
      let refreshToken = VueCookies.get("refreshToken");
      let token = {
        access: accessToken,
        refresh: refreshToken,
      }
      return token;
    },
  },
};
