<template>
  <form @submit.prevent="onSubmit">
    <input 
      type="text"
      placeholder="Aggiungi un nuovo task..."
      name="new-todo" 
      id="new-todo"
      autofocus
      autocomplete="off"
      v-model="currentTodo">
    <button 
      type="submit"
      class="btn no-highlights"
      id="submit"
    >
      <span class="btn-value--md">Aggiungi Task</span>
      <span class="btn-value--sm">➔</span>
    </button>
  </form>
</template>

<script>
export default {
  name: 'TodoInputField',
  data() {
    return {
      currentTodo: ''
    }
  },
  methods: {
    onSubmit() {
      const value = this.currentTodo && this.currentTodo.trim();
      if (value) {
        this.$emit('new-todo', value);
        this.currentTodo = '';
      }
    }
  }
}
</script>

<style scoped>
form {
  background-color: white;
  text-align: center;
  display: flex;
  padding: 1.5rem;
  justify-content: center;
  border-radius: var(--border-radius);
  margin: 0 auto;
  width: 100%;
  max-width: 768px;
  box-shadow: var(--box-shadow-s);
}

input[type="text"] {
  padding: 1rem 1rem;
  font-size: .75rem;
  background-color: var(--grey-200);
  border: 1px solid white;
  border-radius: var(--border-radius);
  flex: 3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--grey-800);
}

input[type="text"]:focus {
  background-color: var(--grey-100);
  outline: none;
  border: 1px solid var(--grey-400);
}

.btn {
  border: none;
  flex: 1;
  background-color: var(--yellow-300);
  color: var(--yellow-900);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: .05rem;
  padding: 0 .5rem;
  margin-left: 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transform: scale(1);
  transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.btn:hover, .btn:focus {
  background-color: var(--yellow-500);
  outline: none;
  box-shadow: 
    0px 8px 16px hsla(0, 0%, 0%, .16), 
    0px 4px 6px hsla(0, 0%, 0%, .12);
}

.btn:active {
  background-color: var(--yellow-500);
  box-shadow: var(--box-shadow-s);
  transform: scale(.95);
}

.btn-value--md {
  display: none;
}

.btn-value--sm {
  font-size: 1.2rem;
}

@media only screen and (min-width: 420px) {
  .btn {
    margin-left: 1.5rem;
  }
}

@media only screen and (min-width: 640px) {
  input[type="text"] {
    flex: 2;
    font-size: 1rem;
  }

  .btn {
    margin-left: 1.5rem;
  }
  
  .btn-value--md {
    display: block;
  }

  .btn-value--sm {
    display: none;
    font-size: 1.5rem;
  }
}

@media only screen and (min-width: 768px) {
  input[type="text"] {
    flex: 3;
  }
}

</style>