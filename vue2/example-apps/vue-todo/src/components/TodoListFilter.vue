<template>
  <div class="todo-list-filter">
    <template v-for="filter in filters">
      <input 
        type="radio" 
        name="filter" 
        :key="'input_' + filter" 
        :id="filter" 
        :value="filter"
        :checked="picked === filter"
        @change="onChange(filter)"
        >
      <label 
        :key="'label_' + filter" 
        class="no-highlights" 
        :for="filter">{{ filter.charAt(0).toUpperCase() + filter.substring(1) }}</label>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TodoListFilter',
  props: {
    picked: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      filters: ['all', 'completed', 'active']
    }
  },
  methods: {
    onChange(filter) {
      this.$emit('change-view', filter);
    }
  }
}
</script>

<style scoped>
.todo-list-filter {
  position: relative;
  text-align: center;
  padding: 2rem;
  margin-top: 2.5rem;
}

input[type="radio"] {
  position: absolute;
  user-select: none;
  width: 0px;
  height: 0px;
  opacity: 0;
  outline: none;
}

input[type="radio"]:focus + label {
  color:var(--blue-900);
  background: var(--blue-100);
  border-radius: var(--border-radius);
}

input[type="radio"]:checked + label {
  color:var(--blue-900);
  background: var(--blue-100);
  border-radius: var(--border-radius);
}

label {
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: .05rem;
  padding: .5rem .5rem;
  text-align: center;
  margin: 0 .5rem;
  font-size: .8rem;
  color: var(--grey-500);
}

label:hover {
  color: var(--grey-800);
}

@media only screen and (min-width: 420px) {
  label {
    padding: .5rem .75rem;
    margin: 0 .75rem;
    font-size: .875rem;
  }
}

@media only screen and (min-width: 640px) {
label {
  padding: .5rem 1rem;
  margin: 0 1rem;
  font-size: 1rem;
}
}
</style>