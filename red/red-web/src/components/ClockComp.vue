<template>
  <div class="p-4 text-center text-7xl">
    {{ realTime }}
  </div>
</template>

<script>
export default {
  name: "ClockComp",
  data() {
    return {
      realTime: "",
      fullDate:"",
    };
  },

  methods: {
    getNowTime() {
      setInterval(() => {
        this.$store.commit("time/SET_REALTIME");
        this.realTime = this.$store.getters["time/getRealTime"];
      }, 500);
    },
  },

  mounted() {
    this.getNowTime();
  },
};
</script>
