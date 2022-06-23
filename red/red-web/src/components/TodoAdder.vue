<template>
  <div class="flex justify-around p-4">
    <input
        type="text"
        v-model="$store.state.todoTaskName"
        placeholder="What Should I do Today?"
        v-on:keydown.enter="addTodo"
        class="w-full p-2 text-center"
    />
    <button type="button" v-on:click="addTodo" class="p-2 bg-red-300 text-white rounded">Submit</button>

  </div>

</template>

<script>

export default {
  name: "TodoAdder",
  methods: {
    addTodo() {
      this.$store.commit("addTodo");
      this.$store.commit("saveLocalstorage");
    },
    async sendPostTodo(){
      const data = await this.$axios.post('http://localhost:3000/api/user/v1/main/list',{
        params: {
          "content":  this.$store.state.todoTaskName,
          "deadline": null,
          "note_checked": "1"
        }
      }).then((res) => res.data.query )
      if(data.response.state !== 1)
        console.log('save fail!!')
    }
  },
  components:{

  },

};
</script>

<style scoped></style>
