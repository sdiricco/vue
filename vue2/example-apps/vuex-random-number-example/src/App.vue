<template>
  <div id="app">
    <div class="counter-wrapper">
      <transition name="fade" mode="out-in">
        <LoadingSpinner v-if="isLoading" color="hsl(188, 58%, 62%)" />
        <CounterDisplay v-else />
      </transition>
    </div>
    <div class="btn-wrapper">
      <CounterButtons />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CounterDisplay from '@/components/CounterDisplay.vue';
import CounterButtons from '@/components/CounterButtons.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'App',
  components: {
    CounterDisplay,
    CounterButtons,
    LoadingSpinner
  },
  computed: mapState({
    isLoading: (state) => state.loadingModule.loading
  })
};
</script>

<style>
:root {
  --primary-color-100: hsl(182, 69%, 95%);
  --primary-color-200: hsl(184, 75%, 87%);
  --primary-color-300: hsl(186, 73%, 74%);
  --primary-color-400: hsl(188, 58%, 62%);
  --primary-color-500: hsl(190, 50%, 45%);
  --primary-color-600: hsl(192, 64%, 41%);
  --primary-color-700: hsl(194, 71%, 34%);
  --primary-color-800: hsl(196, 72%, 28%);
  --primary-color-900: hsl(200, 97%, 14%);

  --secondary-color-100: hsl(210, 36%, 98%);
  --secondary-color-200: hsl(212, 33%, 89%);
  --secondary-color-300: hsl(210, 31%, 80%);
  --secondary-color-400: hsl(211, 27%, 70%);
  --secondary-color-500: hsl(209, 23%, 60%);
  --secondary-color-600: hsl(210, 22%, 49%);
  --secondary-color-700: hsl(209, 34%, 30%);
  --secondary-color-800: hsl(211, 39%, 23%);
  --secondary-color-900: hsl(209, 60%, 15%);

  --success-color-500: hsl(140, 82%, 35%);

  --warning-color-500: hsl(355, 59%, 49%);

  --font-size-3xs: 0.5rem;
  --font-size-2xs: 0.75rem;
  --font-size-xs: 0.875rem;
  --font-size-s: 1rem;
  --font-size-m: 1.25rem;
  --font-size-l: 1.5rem;
  --font-size-xl: 2rem;
  --font-size-2xl: 2.5rem;
  --font-size-3xl: 4rem;
  --font-size-4xl: 5rem;
  --font-size-5xl: 10rem;
}

html,
body {
  height: 100%;
  background: var(--secondary-color-100);
}

* {
  margin: 0;
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  background: white;
  width: 60%;
  max-width: 480px;
  min-width: 300px;
  padding: 2rem 1.5rem;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.14);
  border-radius: 2px;
}

#app::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.25rem;
  background: var(--primary-color-400);
}

.counter-wrapper {
  margin-top: 2rem;
  height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-wrapper {
  margin-top: 4rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
