<template>
  <div class="flex p-2">
    <div class="" v-if="todoitem.todoTaskDone == false">
      <CheckIcon class="h-5 text-red-300" v-on:click="doneTodo"></CheckIcon>
    </div>
    <div class="" v-else>
      <CheckIcon class="h-5 text-red-600" v-on:click="doneTodo"></CheckIcon>
    </div>
    <p class="w-full border-b-2 border-red-600" v-on:click="doneTodo">
      {{ todoitem.todoTaskName }}
    </p>

    <XIcon class="h-5 text-red-600" v-on:click="deleteTodo"></XIcon>
  </div>
</template>

<script>
import { CheckIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/solid";

export default {
  name: "TodoItem",
  props: {
    todoitem: Object,
  },
  components: {
    CheckIcon,
    XIcon,
  },
  data() {
    return {};
  },
  methods: {
    deleteTodo() {
      this.$store.commit("deleteTodo", this.todoitem);
      this.$store.commit("saveLocalstorage");
    },
    doneTodo() {
      this.$store.commit("doneTodo", this.todoitem);
      this.$store.commit("saveLocalstorage");
    },
  },
};
</script>

<style scoped></style>
