import _ from "lodash";
import dayjs from "dayjs";

export const todolist = {
  namespaced: true,
  state: {
    todoList: [],
    todoObject: {},
    todoId: 0,
    todoFullDate: "",
    todoExpiredDate: "",
    todoTaskName: "",
    todoTaskTime: "",
    todoTaskDone: false,
  },
  mutations: {
    /**
     * Add TodoItems
     * @param state
     * @param payload  dayjs_object, expired date
     * @constructor
     */
    SET_TODOITEM_EXPIREDDATE(state, payload) {
      state.todoTaskTime = payload.taskTime;
      state.todoExpiredDate = dayjs(payload.fullDate).add(
        payload.taskTime,
        "m"
      );
    },
    /**
     * State Initialization
     * @param state
     * @constructor
     */
    SET_STATE_INIT(state) {
      state.todoFullDate = "";
      state.todoExpiredDate = "";
      state.todoTaskName = "";
      state.todoTaskTime = "";
      state.todoTaskDone = false;
      state.todoObject = {};
    },

    ADD_TODOITEM(state, payload) {
      if (!state.todoTaskName) {
        return;
      }
      state.todoId++;
      state.todoObjects = {
        todoId: state.todoId,
        todoFullDate: payload.fullDate,
        todoExpiredDate: state.todoExpiredDate,
        todoTaskName: state.todoTaskName,
        todoTaskTime: state.todoTaskTime,
        todoTaskDone: state.todoTaskDone,
      };
      state.todoList.push(state.todoObjects);
      state.todoTaskName = "";
      state.todoObjects = {};
    },
    /**
     * Remove TodoItem
     * @param state
     * @param payload  todoitem_indexno
     * @constructor
     */
    REMOVE_TODOITEM(state, payload) {
      const findTodoItem = _.filter(state.todoList, (findItem) => {
        return findItem.todoId === payload.todoId;
      });
      for (const element of state.todoList) {
        if (findTodoItem[0].todoId === element.todoId) {
          _.remove(state.todoList, findTodoItem[0]);
        }
      }
    },

    /**
     * TodoCheck
     * @param state
     * @param payload todoitem_indexno
     * @constructor
     */
    SET_TODOITEM_DONE(state, payload) {
      const findTodoItem = _.filter(state.todoList, (findItem) => {
        return findItem.todoId === payload.todoId;
      });
      for (const element of state.todoList) {
        if (findTodoItem[0].todoId === element.todoId) {
          element.todoTaskDone = !element.todoTaskDone;
        }
      }
    },

    SET_LOCALSTORAGE(state) {
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },

    SET_TODOLIST(state) {
      if (!localStorage.length) {
        localStorage.setItem("todoList", []);
        return;
      }
      const loadData = JSON.parse(localStorage.getItem("todoList"));
      const todoMaxId = _.maxBy(loadData, (findMaxId) => {
        return findMaxId.todoId;
      });
      state.todoId = todoMaxId;
      state.todoList = loadData;
    },
  },

  actions: {
    addTodoItem(context, payload) {
      context.commit("SET_TODOITEM_EXPIREDDATE", payload);
      context.commit("ADD_TODOITEM", payload);
      context.commit("SET_LOCALSTORAGE");
      context.commit("SET_STATE_INIT")
    },
    removeTodoItem(context, payload) {
      context.commit("REMOVE_TODOITEM", payload);
      context.commit("SET_LOCALSTORAGE");
    },
    setTodoItemDone(context, payload) {
      context.commit("SET_TODOITEM_DONE", payload);
      context.commit("SET_LOCALSTORAGE");
    },
  },
};
