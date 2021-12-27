import { Module } from "vuex";
import { RootState } from "@/store/types";
import { TodoState } from "./types";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

const state: TodoState = {
  todos: [],
  inputText: "",
  expanded: false,
};
export const todo: Module<TodoState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
