// App.vue
<template>
  <div class="container">
    <Quote
      :colorSchema="colorSchema"
      :loadingSpinnerColor="loadingSpinnerColor"
    />
  </div>
</template>

<script>
import Quote from "@/components/Quote";

export default {
  name: "App",
  data() {
    return {
      colorSchema: {
        "--primary-color-100": "hsl(205, 82%, 98%)",
        "--primary-color-200": "hsl(205, 96%, 84%)",
        "--primary-color-300": "hsl(205, 82%, 78%)",
        "--primary-color-400": "hsl(205, 76%, 65%)",
        "--primary-color-500": "hsl(205, 64%, 60%)",
        "--primary-color-600": "hsl(205, 64%, 44%)",
        "--primary-color-700": "hsl(205, 76%, 40%)",
        "--primary-color-800": "hsl(205, 80%, 30%)",
        "--primary-color-900": "hsl(205, 98%, 22%)",
        "--error-color-500": "hsl(360, 65%, 40%)",
      },
      loadingSpinnerColor: "hsl(205, 82%, 78%)",
    };
  },
  components: {
    Quote,
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

.container {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}
</style>
