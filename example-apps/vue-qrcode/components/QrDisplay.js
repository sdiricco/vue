import { QrDownloadButtons } from "./QrDownloadButtons.js";

export const QrDisplay = {
  name: "qr-display",
  components: {
    QrDownloadButtons
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      hasError: false,
      imgSrc: null,
      svgSrc: null,
      dataUrlOpts: {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        quality: 0.8,
        margin: 1,
        width: 256
      },
      stringOpts: {
        type: "svg"
      }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          QRCode.toDataURL(newVal, this.dataUrlOpts, (err, url) => {
            if (err) {
              this.hasError = true;
            } else {
              this.imgSrc = url;
            }
          });

          QRCode.toString(newVal, this.stringOpts, (err, string) => {
            if (err) {
              this.hasError = true;
            } else {
              this.svgSrc = `data:image/svg+xml;base64,${btoa(string)}`;
            }
          });
        }
      }
    }
  },
  template: `
    <div class="display-container">
      <div class="display">
        <div class="qr-code">
          <p class="error" v-if="hasError">
            <span class="error-icon">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h24v24h-24z" fill="none"/><path fill="currentColor" d="m1 21h22l-11-19zm12-3h-2v-2h2zm0-4h-2v-4h2z"/></svg>
            </span>
            Impossibile generare il codice QR. <br>Si &egrave; verificato un errore.
          </p>
          <img v-else :src="imgSrc" alt="">
        </div>
      </div>
      <QrDownloadButtons :imgSrc="imgSrc" :svgSrc="svgSrc" />
    </div>
  `
};
