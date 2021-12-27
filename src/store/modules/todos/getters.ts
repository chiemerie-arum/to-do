import { GetterTree } from "vuex";
import { TodoState, TodoType } from "./types";
import { RootState } from "@/store/types";

export const getters: GetterTree<TodoState, RootState> = {
  todos(state): Array<TodoType> {
    return state.todos;
  },
  pendingTodos(state): Array<TodoType> {
    return state.todos.filter((todo) => todo.done === false);
  },
  doneTodos(state): Array<TodoType> {
    return state.todos.filter((todo) => todo.done === true);
  },
};
