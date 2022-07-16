<template>
  <LinePlot
    :traces="traces"
    :xRange="xRange"
    :yRange="yRange"
  />
</template>

<script>
import LinePlot from "./LinePlot.vue";

import { deepCopy } from "../utils/utils";

export default {
  name: "LinePlotStreaming",
  components: {
    LinePlot,
  },
  props: {
    pause: {
      type: Boolean,
      default: false,
    },
    data: Object,
  },
  data() {
    return {
      yRange: [-10, 10],
      xRange: [],
    };
  },
  watch: {
    data: {
      deep: true,
      handler: function () {
        let _traces = deepCopy(this.traces);
        this.data.x.forEach((_x) => xBuf.push(_x));
        this.data.y.forEach((_y) => yBuf.push(_y));
        _traces[0].x = xBuf.toarray();
        _traces[0].y = yBuf.toarray();
        this.traces = _traces;
      },
    },
  },
  methods: {},
};
</script>
