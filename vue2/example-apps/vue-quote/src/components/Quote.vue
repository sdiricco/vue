<template>
  <div class="quote-container" :style="colorSchema">
    <LoadingSpinner v-if="loading" :color="loadingSpinnerColor" />
    <blockquote v-if="!loading && !error">
      <p>{{ this.quote.text }}</p>
      <footer>{{ this.quote.author }}</footer>
    </blockquote>
    <p class="error" v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner";

export default {
  name: "Quote",
  components: {
    LoadingSpinner,
  },
  props: {
    colorSchema: {
      type: Object,
      default() {
        return {
          "--primary-color-100": "hsl(210, 38%, 97%)",
          "--primary-color-200": "hsl(212, 35%, 99%)",
          "--primary-color-300": "hsl(210, 32%, 78%)",
          "--primary-color-400": "hsl(210, 28%, 72%)",
          "--primary-color-500": "hsl(209, 22%, 60%)",
          "--primary-color-600": "hsl(210, 22%, 44%)",
          "--primary-color-700": "hsl(209, 29%, 36%)",
          "--primary-color-800": "hsl(209, 34%, 30%)",
          "--primary-color-900": "hsl(208, 60%, 14%)",
          "--error-color-500": "hsl(360, 65%, 40%)",
        };
      },
    },
    loadingSpinnerColor: {
      type: String,
      default: "hsl(210, 32%, 78%)",
    },
  },
  data() {
    return {
      loading: false,
      quote: {
        text: "",
        author: "",
      },
      error: "",
    };
  },
  async created() {
    try {
      this.loading = true;

      const response = await fetch("https://type.fit/api/quotes");

      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];

      this.quote.text = randomQuote.text;
      this.quote.author = randomQuote.author || "Anonymous";

      this.loading = false;
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
  },
};
</script>

<style scoped>
blockquote {
  max-width: 640px;
  font-family: "Lora", Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  padding: 2rem;
  background-color: var(--primary-color-100);
  border: 1px solid var(--primary-color-300);
  border-radius: 16px;
}

blockquote p {
  margin-top: 0;
  font-style: italic;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--primary-color-900);
}

blockquote::before {
  /* Virgolette */
  content: "\201c";
  font-size: 7rem;
  line-height: 0.8;
  color: var(--primary-color-400);
  display: block;
  margin-bottom: -2.5rem;
}

blockquote footer {
  color: var(--primary-color-600);
  font-weight: 700;
  font-size: 0.875rem;
  text-align: right;
  margin-top: 1.5rem;
}

blockquote footer::before {
  /* trattino lungo seguito da spazio */
  content: "\2014\0020";
}

.error {
  text-align: center;
  font-size: 1rem;
  color: var(--error-color-500);
}
</style>
