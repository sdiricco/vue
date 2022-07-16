import { QrTextInput } from './components/QrTextInput.js';
import { QrDisplay } from './components/QrDisplay.js';

const vm = new Vue({
  el: "#root",
  components: {
    QrTextInput,
    QrDisplay
  },
  data: {
    isPristine: true,
    textValue: ""
  },
  methods: {
    onTextValue(value) {
      if (value !== "") {
        this.isPristine = false;
      }
      this.textValue = value;
    }
  }
});