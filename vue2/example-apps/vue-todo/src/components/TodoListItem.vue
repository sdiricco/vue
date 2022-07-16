<template>
  <li :class="{completed: todo.completed}">
    <div class="info-container">
      <div class="todo-container">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            class="checkbox" 
            name="status" 
            id="status" 
            :checked="todo.completed"
            @change="onChange(todo.id)">
          <span class="checkbox-custom"></span>
        </label>
        <span>{{ todo.value }}</span>
      </div>
      <button @click="onClick(todo.id)" class="no-highlights" title="Delete task">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </button>
    </div>
    <small>{{ date }}</small>
  </li>
</template>

<script>
import { today, yesterday, sameDay } from '@/utilities/time';

export default {
  name: 'TodoListItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      const todoDate = this.todo.date;

      const isToday = sameDay(todoDate, today);

      const wasYesterday = sameDay(todoDate, yesterday);
      
      if (isToday) {
        return 'Today';
      }

      if (wasYesterday) {
        return 'Yesterday';
      }
      
      return this.todo.date.toLocaleDateString();
    }
  },
  methods: {
    onClick(todoId) {
      this.$emit('delete-todo', {event: 'delete-todo' , todoId});
    },
    onChange(todoId) {
      this.$emit('todo-status-update', {event: 'todo-status-update', todoId });
    }
  }
}
</script>

<style scoped>
  li {
    background-color: white;
    padding: 1.5rem;
    margin-top: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-s);
  }

  li.completed {
    box-shadow: none;
    background-color: var(--grey-200);
  }


  li:first-of-type {
    margin-top: 1rem;
  }

  span {
    display: block;
    color: var(--grey-900);
    font-size: .875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .todo-container {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 1rem;
  }
  
.checkbox-label {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    line-height: 24px;
    height: 24px;
    width: 24px;
    margin-right: 1rem;
}

.checkbox-label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkbox-label .checkbox-custom {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 24px;
    width: 24px;
    background-color: transparent;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    border: 2px solid var(--cyan-500);
}


.checkbox-label input:checked ~ .checkbox-custom {
    background-color: var(--cyan-500);
    border-radius: 5px;
    transform: rotate(0deg) scale(1);
    opacity:1;
    border: 2px solid var(--cyan-500);
}


.checkbox-label .checkbox-custom::after {
    position: absolute;
    content: "";
    left: 12px;
    top: 12px;
    height: 0px;
    width: 0px;
    border-radius: 5px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(0deg) scale(0);
    opacity:1;
    transition: all 0.3s ease-out;
}


.checkbox-label input:checked ~ .checkbox-custom::after {
  transform: rotate(45deg) scale(1);
  opacity:1;
  left: 8px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  background-color: transparent;
  border-radius: 0;
}

li.completed button {
  background-color: var(--grey-300);
}

li.completed span {
  color: var(--grey-500);
  text-decoration: line-through;
}

li.completed button:hover {
  color: hsl(360, 64%, 55%);
}

li.completed button:focus {
  background-color: hsl(360, 100%, 97%);
  color: hsl(360, 64%, 55%);
  outline: none;
}

li.completed button:active {
  background-color: hsl(360, 100%, 97%);
  color: hsl(360, 72%, 38%);
}

button {
  background-color: white;
  color: var(--grey-500);
  border: none;
  cursor: pointer;
  border-radius: var(--border-radius);
}

button:hover {
  color: hsl(360, 64%, 55%);
}

button:focus {
  background-color: hsl(360, 100%, 97%);
  color: hsl(360, 64%, 55%);
  outline: none;
}

button:active {
  background-color: hsl(360, 100%, 97%);
  color: hsl(360, 72%, 38%);
}

small {
  display: inline-block;
  margin-top: 1rem;
  color: var(--cyan-500);
  font-weight: 700;
  font-size: .75rem;
}

li.completed small {
  color: var(--grey-400);
}

@media only screen and (min-width: 420px) {
  span {
    font-size: 1rem;
  }
}
</style>