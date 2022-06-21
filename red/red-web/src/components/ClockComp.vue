<template>
  <div class="text-7xl text-center">
    {{ $store.state.clock }}
  </div>
</template>

<script>
export default {
  name: "ClockComp",
  methods: {
    getCurrentTime() {
      this.$store.commit("getCurrentTime");
    },
  },

  mounted() {
    setInterval(this.getCurrentTime, 100);
  },
};
</script>

<style scoped></style>
