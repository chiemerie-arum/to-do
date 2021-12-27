import TodoService from "../../../../utils/TodoService";
import { ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { TodoState, Context, TodoType } from "./types";
import { TodoMutations } from "./mutations";

export const actions: ActionTree<TodoState, RootState> = {
  createTodo({ commit }: Context, todo: TodoType) {
    return TodoService.postTodo(todo)
      .then(() => {
        commit(TodoMutations.ADD_TODO, todo);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  fetchTodos({ commit }: Context) {
    TodoService.getTodos().then((response) => {
      commit(TodoMutations.SET_TODOS, response.data);
    });
  },
  updateTodo({ commit }: Context, todo: TodoType) {
    commit(TodoMutations.UPDATE_TODO, todo);
  },
};
