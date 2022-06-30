<template>
  <div class="text-red-600 text-center">
  </div>
<TodoListAdder></TodoListAdder>
    <div v-for="(item, index) in $store.state.todolist.todoList" :key="index">
      <TodoListItem v-bind:todoitem="item"></TodoListItem>
    </div>
</template>

<script>
import TodoListItem from "@/components/todolist/TodoListItem";
import TodoListAdder from "@/components/todolist/TodoListAdder";


export default {
  name: "TodoView",
  components: {TodoListAdder, TodoListItem, },
  beforeCreate() {
    this.$store.commit("todolist/SET_TODOLIST");
  },
};
</script>
