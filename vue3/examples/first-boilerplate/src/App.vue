<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav >
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
.link{
padding-right: 12px;
}
</style>
