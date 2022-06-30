<template>
  <div class="flex justify-around p-4">
    <input
      type="text"
      v-model="$store.state.todolist.todoTaskName"
      placeholder="What Should I do Today?"
      v-on:keydown.enter="addTodoItem"
      class="w-full p-2 text-center"
    />
    <input type="text" v-model="taskTime" placeholder="30min">
    <button
      type="button"
      v-on:click="addTodoItem"
      class="rounded bg-red-700 p-2 text-white"
    >
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoListAdder",
  data() {
    return {
      fullDate: "",
      taskTime: "",
    };
  },
  methods: {
    addTodoItem() {
      this.$store.commit("time/SET_FULLDATE");
      this.fullDate = this.$store.getters["time/getFullDate"];
      this.$store.dispatch("todolist/addTodoItem", {
        fullDate: this.fullDate,
        taskTime: this.taskTime,
      });
    },
  },

  //   async sendPostTodo() {
  //     const data = await this.$axios
  //       .post(`http://${hostIp}/api/user/v1/main/list`, {
  //         params: {
  //           content: this.$store.state.todoTaskName,
  //           deadline: null,
  //           note_checked: "1",
  //         },
  //       })
  //       .then((res) => res.data.query);
  //     if (data.response.state !== 1) console.log("save fail!!");
  //   },
  // },
};
</script>
