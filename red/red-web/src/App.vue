<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="router w-3/4 rounded-2xl bg-white p-4 shadow-2xl">
      <ClockComp></ClockComp>
      <TodoView></TodoView>
    </div>
  </div>
</template>

<script>
import TodoView from "@/components/TodoView";
import ClockComp from "@/components/ClockComp";

export default {
  name: "App",
  components: {

    ClockComp,
    TodoView,
  },
};
</script>

<style>
#app {
}
</style>
