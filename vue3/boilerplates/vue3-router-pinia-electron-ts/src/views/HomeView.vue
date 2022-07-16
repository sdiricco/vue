<template>
  <div class="home">
    <h1>Home</h1>
    <p>Counter: {{counter.count}}</p>
    <button @click="counter.increase(1)">+</button>
    <button @click="counter.decrease(1)">-</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

</script>