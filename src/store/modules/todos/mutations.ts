import { TodoState, TodoType } from "./types";
import { MutationTree } from "vuex";

export enum TodoMutations {
  ADD_TODO = "ADD_TODO",
  SET_TODOS = "SET_TODOS",
  UPDATE_TODO = "UPDATE_TODO",
}
export const mutations: MutationTree<TodoState> = {
  [TodoMutations.ADD_TODO](state: TodoState, todo: TodoType) {
    state.todos.push(todo);
  },
  [TodoMutations.SET_TODOS](state: TodoState, todos: Array<TodoType>) {
    state.todos = todos;
  },
  [TodoMutations.UPDATE_TODO](state: TodoState, incomingTodo: TodoType) {
    const todoToBeUpdated = state.todos.find(
      (todo) => todo.id === incomingTodo.id
    );
    if (todoToBeUpdated) {
      todoToBeUpdated.done = !todoToBeUpdated.done;
    }
  },
};
