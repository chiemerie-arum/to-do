<template>
  <div class="home">
    <h2>To Do List</h2>
    <div class="todo-list">
      <h3 v-if="!todos.length" style="text-align: left">No todos</h3>
      <accordion v-if="doneTodos.length" class="todo-list__done-items">
        <accordion-item>
          <template slot="accordion-trigger">
            <h3 @click="updateExpaned">
              <span><font-awesome-icon :icon="iconSelector" /></span> &emsp;
              {{ doneTodos.length }} Done
            </h3>
          </template>
          <template slot="accordion-content">
            <div
              v-for="(todo, index) in doneTodos"
              :key="'done-' + index + todo.title"
            >
              <label class="container">
                <div class="todo-list__done-items__name">
                  <div class="name">{{ todo.title }}</div>
                  <div class="date">{{ getDate(todo.date) }}</div>
                </div>
                <input
                  type="checkbox"
                  :class="{ checked: todo.done }"
                  @click="updateTodo(todo)"
                  checked
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </template>
        </accordion-item>
      </accordion>
      <div class="todo-list__pending-items">
        <div
          v-for="(todo, index) in pendingTodos"
          :key="'pending-' + index + todo.title"
        >
          <label class="container">
            <div class="todo-list__pending-items__name">
              <div class="name">{{ todo.title }}</div>
              <div class="date">{{ getDate(todo.date) }}</div>
            </div>
            <input
              type="checkbox"
              :checked="todo.done"
              @click="updateTodo(todo)"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="add-item-wrapper">
      <input v-model="inputText" placeholder="A new Todo Item..." />
      <button
        @mouseover="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click="addItem"
        :class="{ disabled: !inputText }"
        :disabled="!inputText"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DateFormatter from "../../utils/DateFormatter";
import Accordion from "../components/accordion.vue";
import AccordionItem from "../components/accordion-item.vue";
import { mapGetters } from "vuex";

interface TodoItem {
  id: number;
  title: string;
  date: number;
  done: boolean;
}

interface TodoData {
  inputText: string;
  expanded: boolean;
  buttonText: string;
}

export default Vue.extend({
  name: "Home",
  components: {
    Accordion,
    AccordionItem,
  },
  data(): TodoData {
    return {
      inputText: "",
      expanded: false,
      buttonText: "Add Item",
    };
  },
  created() {
    this.$store.dispatch("fetchTodos");
  },
  computed: {
    ...mapGetters(["doneTodos", "pendingTodos", "todos"]),
    iconSelector(): string {
      return this.expanded === true ? "caret-down" : "caret-right";
    },
  },
  methods: {
    onMouseEnter() {
      this.buttonText = this.inputText;
    },
    onMouseLeave() {
      this.buttonText = "Add Item";
    },
    updateExpaned() {
      this.expanded = !this.expanded;
    },
    addItem() {
      const todo: TodoItem = {
        id: this.todos.length + 1,
        title: this.inputText,
        date: Date.now(),
        done: false,
      };
      this.$store.dispatch("createTodo", todo);
      this.inputText = "";
      this.buttonText = "Add Item";
    },
    updateTodo(todo: TodoItem) {
      this.$store.dispatch("updateTodo", todo);
    },
    getDate(date: number) {
      return DateFormatter(date);
    },
  },
});
</script>

<style scoped lang="scss">
/* Colors: */
$button-primary-color: #005fbc;
$button-primary-hover-color: #0080ff;
$button-disabled: #ccc;
$text-color: #121212;
$text-color-done: #aaa;
$white-color: #fff;

.home {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  h2 {
    font-size: 28px;
    font-weight: bold;
    color: $text-color;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
}

.add-item-wrapper {
  position: fixed;
  bottom: 5%;

  input {
    width: 610px;
    height: 30px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    margin-right: 5px;
    padding: 4px;
    outline: none;
    &::placeholder {
      color: $button-disabled;
    }

    @media (max-width: 768px) {
      width: 227px;
    }

    @media (min-width: 768px) and (max-width: 1080px) {
      width: 430px;
    }
  }

  button {
    width: fit-content;
    height: 40px;
    border: none;
    border-radius: 4px;
    color: $white-color;
    background-color: $button-primary-color;
    cursor: pointer;

    &:hover {
      background-color: $button-primary-hover-color;
    }

    &.disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
}

.todo-list {
  width: 100%;
  max-height: 30rem;
  overflow: hidden;
  overflow-y: scroll;

  @media (max-width: 768px) {
    width: auto;
  }

  &__done-items {
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;

    &__name {
      text-align: left;
      color: $text-color-done;

      .name {
        font-size: 15px;
        text-decoration: line-through;
      }

      .date {
        font-size: 10px;
        color: $text-color-done;
      }
    }

    h3 {
      color: #cccccc;
    }
  }

  &__pending-items {
    &__name {
      text-align: left;

      .name {
        font-size: 15px;
        color: $text-color;
      }

      .date {
        font-size: 10px;
        color: $text-color-done;
      }
    }
  }
}

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  input.checked ~ .checkmark {
    background-color: #0080ff;
    border: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }
}

.checkmark {
  position: absolute;
  top: 0px;
  left: 0;
  height: 25px;
  width: 25px;
  border: 1px solid #cccccc;
  border-radius: 15px;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }
}
</style>
