<template>
  <div class="loading-spinner-container">
    <div class="circles">
      <div v-for="i in 4" :key="i" :style="style"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    color: {
      type: String,
      default: "black",
    },
  },
  computed: {
    style() {
      return `background-color: ${this.color}`;
    },
  },
};
</script>

<style scoped>
.loading-spinner-container {
  text-align: center;
}

/* Codice originale: https://loading.io/css/ */
.circles {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 16px;
}
.circles div {
  position: absolute;
  top: 16px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.circles div:nth-child(1) {
  left: 8px;
  animation: circles1 0.6s infinite;
}
.circles div:nth-child(2) {
  left: 8px;
  animation: circles2 0.6s infinite;
}
.circles div:nth-child(3) {
  left: 32px;
  animation: circles2 0.6s infinite;
}
.circles div:nth-child(4) {
  left: 56px;
  animation: circles3 0.6s infinite;
}
@keyframes circles1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes circles3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes circles2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
