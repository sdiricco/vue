export const QrDownloadButtons = {
  name: "qr-download-buttons",
  props: {
    imgSrc: String,
    svgSrc: String
  },
  methods: {
    timestamp() {
      return Date.now();
    }
  },
  template: `
    <div class="download-area">
      <div class="buttons">
        <a class="btn" :href="imgSrc" :download="'qr_code_' + timestamp() + '.jpeg'">
          Download <br><small>jpeg</small>
        </a>
        <a class="btn" :href="svgSrc" :download="'qr_code_' + timestamp() + '.svg'">
          Download <br><small>svg</small>
        </a>
      </div>
    </div>
  `
};
