import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interface todo {
  id: number;
  title: string;
  date: number;
  done: boolean;
}

export default {
  getTodos() {
    return apiClient.get("/todos");
  },
  postTodo(todo: todo) {
    return apiClient.post("/todos", todo);
  },
};
