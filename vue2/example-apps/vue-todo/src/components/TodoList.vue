<template>
  <ul>
    <TodoListItem 
      v-for="todo in todos" 
      :key="todo.id"  
      :todo="todo" 
      @todo-status-update="forward"
      @delete-todo="forward" />
  </ul>
</template>

<script>
import TodoListItem from './TodoListItem';

export default {
  name: 'TodoList',
  components: {
    TodoListItem
  },
  props: {
    todos: Array
  },
  methods: {
    forward(payload) {
      if (payload && payload.event) {
        this.$emit(payload.event, payload.todoId);
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  max-width: 768px;
  margin: 0 auto;
}
</style>