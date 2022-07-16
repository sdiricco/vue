export const QrTextInput = {
  name: "qr-text-input",
  methods: {
    onClick() {
      const inputValue = this.$refs.inputText.value;
      this.$emit("text-value", inputValue);
    }
  },
  template: `
    <form>
      <input
        type="text"
        placeholder="Inserisci del testo qui..."
        ref="inputText"
        autofocus>
      <button class="btn" type="submit" @click.prevent="onClick">Genera Codice Qr</button>
    </form>
  `
};
