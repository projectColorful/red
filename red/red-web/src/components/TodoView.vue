<template>
  <TodoAdder></TodoAdder>
    <div v-for="(item, index) in $store.state.todoList" :key="index">
      <TodoItem v-bind:todoitem="item"></TodoItem>
    </div>

</template>

<script>
import TodoItem from "@/components/TodoItem";
import TodoAdder from "./TodoAdder";

export default {
  name: "TodoView",
  components: { TodoItem,TodoAdder },
  beforeCreate() {
    this.$store.commit("loadTodo");
  },
};
</script>

<style scoped></style>
