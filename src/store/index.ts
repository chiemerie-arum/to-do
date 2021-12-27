import Vue from "vue";
import Vuex from "vuex";
import { StoreOptions } from "vuex";
import { todo } from "./modules/todos";
import { RootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    message: "Nice To-Do App!",
  },
  modules: {
    todo,
  },
};
export default new Vuex.Store(store);
