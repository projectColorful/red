import { createStore } from "vuex";
import { time } from "@/store/module/time";
import { todolist } from "@/store/module/todolist";

export const store = createStore({
  modules: {
    time: time,
    todolist: todolist

  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
