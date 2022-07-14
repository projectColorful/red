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
    <!-- 200 ~ 600 1:4 -->
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
import axios from "axios";

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
    async changeTodoItemColor(){
      const data = await axios.get('http://localhost:3000/api/v1/')
      //마감시간을 가져옴
      let temprgd = new Date();//생성시간 -> 디비에서 들고와야됨
      let tempEnd = new Date(0,0,0,0,30,0)//마감시간 30분 -> 디비에서 들고와야됨
      let tempcal = temprgd.getTime() + tempEnd.getTime();//계산용 마감시간만들어줌
      //남은시간을 구함
      let tempsub = tempcal - temprgd//남은시간 
      let tempmintoSec = (tempsub *60)//최소단위인 초로 변환하여 작업진행
      //퍼센트로 환산
      let percent = (tempmintoSec)//퍼센트화 시킴
      //1:4비율로 환산하여 부트스트램 변경 색상 값범위 200~600

    }
  },
  created() {
    this.calculateRemainingTime()
  }
};
</script>
