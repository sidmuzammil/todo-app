//This component creates a Redux slice for managing a to-do list, including actions and reducers for adding, deleting, and updating items, while also synchronizing data with local storage.

import { createSlice } from "@reduxjs/toolkit";


//This function retrieves to-do items from local storage. If items exist, it parses and returns them; otherwise, it initializes an empty array in local storage and returns an empty array.
const getItems = () => {
  const localTodos = localStorage.getItem("todo");

  if (localTodos) {
    return JSON.parse(localTodos);
  }
  localStorage.setItem("todo", []);
  return [];
};

const initialValue = {
  todoList: getItems(),
};

const TodoSlice = createSlice({
  name: "Todo",
  initialState: initialValue,
  reducers: {

    // This reducer adds a new to-do item to the Redux state's `todoList` array and updates the corresponding data in local storage to maintain synchronization.
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = localStorage.getItem("todo");
      if (todoList) {
        const todoArr = JSON.parse(todoList);
        todoArr.push({
          ...action.payload,
        });
        localStorage.setItem("todo", JSON.stringify(todoArr));
      } else {
        localStorage.setItem(
          "todo",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },

    //This reducer deletes a to-do item from the Redux state's `todoList` array and updates the corresponding data in local storage to keep the data in sync.
    deleteTodo: (state, action) => {
      const todoLocal = localStorage.getItem("todo");
      if (todoLocal) {
        const todoArr = JSON.parse(todoLocal);
        todoArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoArr.splice(index, 1);
          }
        });
        localStorage.setItem("todo", JSON.stringify(todoArr));
        state.todoList = todoArr;
      }
    },

    //This reducer updates a to-do item in the Redux state's `todoList` array based on the provided payload (id, status, title, priority). It also updates the corresponding data in local storage to maintain consistency between the Redux state and local storage.
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem("todo");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.task = action.payload.title;
            todo.priority = action.payload.priority;
          }
        });
        localStorage.setItem("todo", JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
