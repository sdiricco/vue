<template>
  <div>
    <div class="display">Contatore: {{ counter }}</div>
    <button class="btn" @click="add">aggiungi 1</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    add() {
      this.counter++;
    },
  },
};
</script>

<style scoped>
* {
  --primary-color-100: hsl(247, 14%, 35%);
  --primary-color-200: hsl(246, 14%, 30%);
  --accent-color-100: hsl(182, 100%, 89%);
}

.display {
  font-size: 3em;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  color: var(--primary-color-200);
}

.btn {
  background-color: var(--primary-color-200);
  color: var(--accent-color-100);
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  border: none;
  border-radius: 1.5rem;
  padding: 0.875rem 1rem;
  transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: scale(1);
  cursor: pointer;
}

.btn:hover {
  background-color: var(--primary-color-100);
}

.btn:focus {
  outline: none;
  background-color: var(--primary-color-100);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.26);
}

.btn:active {
  transform: scale(0.9);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.14);
}
</style>
