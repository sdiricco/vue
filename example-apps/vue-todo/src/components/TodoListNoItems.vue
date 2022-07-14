<template>
  <div class="illustration-container">
    <HappyMusic class="illustration" />
    <p class="message">
      Grandioso! Non hai nuovi task da completare!<br> 
      Rilassati e goditi la giornata 😎
    </p>
    <a 
      v-if="noOfCompletedTodos"
      @click.prevent="$emit('change-view', 'completed')"
      href="">
        Mostra Tasks completati
      </a>
  </div>
</template>

<script>
import HappyMusic from '@/assets/undraw_happy_music.svg?inline';

export default {
  name: 'TodoListNoItems',
  components: {
    HappyMusic
  },
  props: {
    noOfCompletedTodos: Number
  }
}
</script>

<style scoped>
.illustration-container {
  max-width: 768px;
  margin: 4rem auto 0;
  position: relative;
  text-align: center;
}

.illustration {
  width: 50%;
}

.message {
  color: var(--blue-900);
  font-size: 1rem;
  margin-top: 1.5rem;
  line-height: 1.5;
}

a {
  color: var(--cyan-500);
  font-size: .875rem;
}

a:active {
  color: var(--cyan-700);
}
</style>