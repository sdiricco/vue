<template>
  <div class="btn-container">
    <button
      :disabled="disabled"
      class="btn btn--rnd"
      title="Decrementa il valore"
      @click="decrementValue(1)"
    >
      -
    </button>
    <button
      @click="getNewRandomValue(range)"
      class="btn btn--primary"
      title="Genera un nuovo numero casuale"
    >
      rigenera numero
    </button>
    <button
      class="btn btn--rnd"
      title="Incrementa il valore"
      @click="incrementValue(1)"
    >
      +
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CounterButtons',
  data() {
    return {
      range: {
        min: 10,
        max: 500
      }
    };
  },
  computed: mapState({
    disabled: (state) => state.randomNumberModule.num <= 0
  }),
  methods: mapActions('randomNumberModule', [
    'getNewRandomValue',
    'incrementValue',
    'decrementValue'
  ])
};
</script>

<style scoped>
.btn-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.btn {
  color: var(--primary-color-900);
  text-transform: uppercase;
  font-weight: 700;
  background: none;
  cursor: pointer;
  outline: none;
  transition: transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn--primary {
  font-size: 0.875rem;
  border: none;
  padding: 0rem 2rem;
  height: 3rem;
}

.btn--primary:focus,
.btn--primary:hover {
  background: var(--primary-color-200);
  border-radius: 3rem;
}

.btn--primary:active {
  background: var(--primary-color-400);
}

.btn--rnd {
  display: inline-block;
  border: 2px solid var(--primary-color-200);
  text-align: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border-radius: 50%;
  font-size: 1.5rem;
}

.btn--rnd:focus,
.btn--rnd:hover {
  background: var(--primary-color-200);
}

.btn--rnd:active {
  background: var(--primary-color-400);
  border: 2px solid var(--primary-color-400);
}

.btn--rnd:disabled {
  cursor: not-allowed;
  background: var(--secondary-color-200);
  border: 2px solid var(--secondary-color-200);
  color: var(--secondary-color-400);
}

.btn--primary:active,
.btn--rnd:active {
  transform: scale(0.95);
}
</style>
