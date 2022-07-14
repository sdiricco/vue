<template>
  <div class="wrapper">
    <div class="container">
      <TheHeader />
      <TodoInputField @new-todo="onNewTodo" />
      <div v-if="displayTodos">
        <TodoListFilter @change-view="onChangeView" :picked="currentView" />
        <div
          class="no-completed-todos"
          v-if="currentView === 'completed' && !noOfCompletedTodos"
        >
          Non ci sono task completati 🤔
        </div>
        <TodoList
          @delete-todo="deleteTodo"
          @todo-status-update="updateTodoStatus"
          :todos="visibleTodos"
        />
      </div>
      <TodoListNoItems
        :no-of-completed-todos="noOfCompletedTodos"
        @change-view="currentView = $event"
        v-else
      />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import uniqid from 'uniqid';

import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import TodoInputField from '@/components/TodoInputField.vue';
import TodoListFilter from '@/components/TodoListFilter.vue';
import TodoList from '@/components/TodoList.vue';
import TodoListNoItems from '@/components/TodoListNoItems.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TodoInputField,
    TodoList,
    TodoListFilter,
    TodoListNoItems,
    TheFooter
  },
  data() {
    return {
      todos: [],
      currentView: 'all'
    };
  },
  computed: {
    noOfCompletedTodos() {
      return this.completedTodos().length;
    },
    displayTodos() {
      const active = this.activeTodos();
      const completed = this.completedTodos();
      return (
        active.length ||
        (!active.length && completed.length && this.currentView === 'completed')
      );
    },
    visibleTodos() {
      if (this[this.currentView + 'Todos']) {
        return this[this.currentView + 'Todos']();
      }
      return this.todos;
    }
  },
  methods: {
    deleteTodo(todoId) {
      const foundIndex = this.todos.findIndex(obj => obj.id === todoId);
      if (foundIndex < this.todos.length) {
        this.todos.splice(foundIndex, 1);
      }
    },
    updateTodoStatus(todoId) {
      const foundElement = this.todos.find(obj => obj.id === todoId);
      foundElement.completed = !foundElement.completed;
    },
    onChangeView(picked) {
      this.currentView = picked;
    },
    onNewTodo(newTodoValue) {
      if (newTodoValue) {
        this.todos.push(this.createNewTodo(newTodoValue));
      }
    },
    createNewTodo(value) {
      return {
        id: uniqid(),
        date: new Date(),
        completed: false,
        value
      };
    },
    activeTodos() {
      return this.todos.filter(todo => {
        return !todo.completed;
      });
    },
    allTodos() {
      return [...this.activeTodos(), ...this.completedTodos()];
    },
    completedTodos() {
      return this.todos.filter(todo => {
        return todo.completed;
      });
    }
  }
};
</script>

<style>
:root {
  --grey-100: hsl(210, 36%, 96%);
  --grey-200: hsl(210, 33%, 89%);
  --grey-300: hsl(210, 31%, 80%);
  --grey-400: hsl(211, 27%, 70%);
  --grey-500: hsl(210, 24%, 60%);
  --grey-600: hsl(210, 23%, 49%);
  --grey-700: hsl(209, 29%, 36%);
  --grey-800: hsl(209, 34%, 30%);
  --grey-900: hsl(209, 61%, 16%);

  --yellow-100: hsl(49, 100%, 96%);
  --yellow-200: hsl(48, 100%, 88%);
  --yellow-300: hsl(48, 95%, 76%);
  --yellow-400: hsl(48, 94%, 68%);
  --yellow-500: hsl(44, 92%, 63%);
  --yellow-600: hsl(42, 87%, 55%);
  --yellow-700: hsl(36, 77%, 49%);
  --yellow-800: hsl(29, 80%, 42%);
  --yellow-900: hsl(15, 86%, 30%);

  --blue-100: hsl(205, 79%, 92%);
  --blue-200: hsl(205, 97%, 85%);
  --blue-300: hsl(205, 84%, 74%);
  --blue-400: hsl(205, 74%, 65%);
  --blue-500: hsl(205, 65%, 55%);
  --blue-600: hsl(205, 67%, 45%);
  --blue-700: hsl(205, 76%, 39%);
  --blue-800: hsl(205, 87%, 29%);
  --blue-900: hsl(205, 100%, 21%);

  --cyan-100: hsl(186, 100%, 94%);
  --cyan-200: hsl(185, 94%, 87%);
  --cyan-300: hsl(184, 80%, 74%);
  --cyan-400: hsl(184, 65%, 59%);
  --cyan-500: hsl(185, 57%, 50%);
  --cyan-600: hsl(185, 62%, 45%);
  --cyan-700: hsl(184, 77%, 34%);
  --cyan-800: hsl(185, 81%, 29%);
  --cyan-900: hsl(184, 91%, 17%);

  --border-radius: 8px;

  --box-shadow-s: 0px 1px 4px hsla(0, 0%, 0%, 0.12),
    0px 1px 2px hsla(0, 0%, 0%, 0.24);
  --box-shadow-m: 0px 8px 16px hsla(0, 0%, 0%, 0.16),
    0px 4px 6px hsla(0, 0%, 0%, 0.12);
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
}

.no-highlights {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

body {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--grey-100);
}

.wrapper {
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.container {
  position: relative;
  padding: 0 1.5rem;
  height: 100%;
  flex: 1 0 auto;
}

.no-completed-todos {
  color: var(--grey-400);
  text-align: center;
}
</style>
