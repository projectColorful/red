<template>
  <div class="flex p-2">
    <div class="" v-if="!todoitem.todoTaskDone">
      <CheckIcon
        class="h-5 text-red-300"
        v-on:click="setTodoItemDone(todoitem)"
      ></CheckIcon>
    </div>
    <div class="" v-else>
      <CheckIcon
        class="h-5 text-red-600"
        v-on:click="setTodoItemDone(todoitem)"
      ></CheckIcon>
    </div>
    <div
      class="w-full border-b-2 border-red-600"
      v-on:click="setTodoItemDone(todoitem)"
    >
      {{ todoitem.todoTaskName }}
    </div>
    <div class="">{{ remainingTime }}</div>
    <XIcon
      class="h-5 text-red-600"
      v-on:click="removeTodoItem(todoitem)"
    ></XIcon>
  </div>
</template>

<script>
import { CheckIcon, XIcon } from "@heroicons/vue/solid";
import { mapActions } from "vuex";
import dayjs from 'dayjs'

export default {
  name: "TodoListItem",
  props: {
    todoitem: Object,
  },
  data() {
    return {
      remainingTime: "",
    };
  },

  components: {
    CheckIcon,
    XIcon,
  },
  methods: {
    ...mapActions({
      removeTodoItem: "todolist/removeTodoItem",
      setTodoItemDone: "todolist/setTodoItemDone",
    }),
    // TODO : payload - > time.js -> getter
    calculateRemainingTime() {
      setInterval(() => {
        this.remainingTime = (dayjs()/dayjs(this.todoitem.todoExpiredDate))*100
      }, 500)
    },
  },
  created() {
    this.calculateRemainingTime()
  }
};
</script>
