<template>
  <ClockComp></ClockComp>
  <TodoView></TodoView>
</template>

<script>

import ClockComp from "@/components/ClockComp";
import TodoView from "@/views/TodoView";
export default {
  name: "HomeView",
  components: {TodoView, ClockComp},
};
</script>
