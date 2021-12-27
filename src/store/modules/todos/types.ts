import { RootState } from "@/store/types";
import { ActionContext } from "vuex";
export interface TodoType {
  id: number;
  title: string;
  date: number;
  done: boolean;
}
export interface TodoState {
  todos: Array<TodoType>;
  inputText: string;
  expanded: boolean;
}

export type Context = ActionContext<TodoState, RootState>;
