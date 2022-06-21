import { createStore } from "vuex";


export const store = createStore({
  state: {
    todoList: [],
    todoObjects: {},
    todoId: 0,
    todoCreated: "",
    todoTaskName: "",
    todoTaskDone: false,
    timeStamp: "",
    clock:""
  },
  mutations: {
    addTodo(state) {
      if (state.todoTaskName == "") {
        return;
      }
      state.todoId++;
      state.todoObjects = {
        todoId: this.state.todoId,
        todoCreated: this.state.timeStamp,
        todoTaskName: this.state.todoTaskName,
        todoTaskDone: this.state.todoTaskDone,
      };
      state.todoList.push(state.todoObjects);
      localStorage.setItem("todoId", state.todoId);
      state.todoTaskName = "";
      state.todoObjects = {};
    },
    deleteTodo(state,payload){
      let findTodoItem = state.todoList.filter((person)=>{return person.todoId === payload.todoId})
      for (let i = 0; i < state.todoList.length; i++) {
        if (findTodoItem[0].todoId === state.todoList[i].todoId){
          state.todoList.splice(i,1)
          i--
        }
      }
    },
    doneTodo(state,payload){
      let findTodoItem = state.todoList.filter((person)=>{return person.todoId === payload.todoId})
      for (let i = 0; i < state.todoList.length; i++) {
        if (findTodoItem[0].todoId === state.todoList[i].todoId){
          if(state.todoList[i].todoTaskDone == true){
            state.todoList[i].todoTaskDone = false
          } else {
            state.todoList[i].todoTaskDone = true
          }

        }
      }
    },

    saveLocalstorage(state) {
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },

    loadTodo(state) {
      if (localStorage.length == 0) {
        localStorage.setItem("todoId","0")
        localStorage.setItem("todoList", JSON.stringify(state.todoList));
        return
      }
      state.todoId = JSON.parse(localStorage.getItem("todoId"));
      state.todoList = JSON.parse(localStorage.getItem("todoList"));
    },
    getCurrentTime(state) {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      if (minutes < 10){
        minutes = '0' + minutes;
      }
      if (seconds < 10){
        seconds = '0' + seconds;
      }

      state.clock = `${hours} : ${minutes} : ${seconds}`
      state.timeStamp = now;
    },
  },
});
