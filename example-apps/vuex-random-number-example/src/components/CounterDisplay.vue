<template>
  <span class="value-container">{{ num }}</span>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CounterDisplay',
  computed: mapState({ num: (state) => state.randomNumberModule.num })
};
</script>

<style scoped>
.value-container {
  font-size: var(--font-size-5xl);
  color: var(--primary-color-900);
}
</style>
