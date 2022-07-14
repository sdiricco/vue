<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <LinePlot :traces="traces" :yRange="yRange"/>
    <button @click="onStart">Start</button>
    <button @click="onPause">Pause</button>
    <div>
      <button @click="onZoomIn">zoom in</button>
      <button @click="onZoomOut">zoom out</button>
    </div>
  </div>
</template>

<script>
import LinePlot from "./components/LinePlot.vue";
import { deepCopy, fillXYZData } from "./utils/utils";

const CircularBuffer = require("circular-buffer");

const buf = [
  {
    x: new CircularBuffer(1000),
    y: new CircularBuffer(1000)
  },
  {
    x: new CircularBuffer(1000),
    y: new CircularBuffer(1000)
  },
  {
    x: new CircularBuffer(1000),
    y: new CircularBuffer(1000)
  }
]


export default {
  name: "App",
  components: {
    LinePlot,
  },
  data() {
    return {
      pause: true,
      backEndId: undefined,
      yRange: [-10, 10],
      data: {
        x: [],
        y: [],
        backEndStarted: false,
      },
      traces: [
        {
          x: [],
          y: [],
          type: "scatter",
        },
        {
          x: [],
          y: [],
          type: "scatter",
        },
        {
          x: [],
          y: [],
          type: "scatter",
        },
      ],
    };
  },
  methods: {
    onStart() {
      this.backEndSimulator();
    },
    onPause() {
      clearInterval(this.backEndId);
    },
    onZoomIn() {},
    onZoomOut() {},
    backEndSimulator() {
      this.backEndId = setInterval(() => {

        let _traces = deepCopy(this.traces);

        const xyzData = fillXYZData(200);

        xyzData[0].x.forEach(d => buf[0].x.push(d));
        xyzData[0].y.forEach(d => buf[0].y.push(d));
        xyzData[1].x.forEach(d => buf[1].x.push(d));
        xyzData[1].y.forEach(d => buf[1].y.push(d));
        xyzData[2].x.forEach(d => buf[2].x.push(d));
        xyzData[2].y.forEach(d => buf[2].y.push(d));

        _traces[0].x = buf[0].x.toarray()
        _traces[0].y = buf[0].y.toarray()
        _traces[1].x = buf[1].x.toarray()
        _traces[1].y = buf[1].y.toarray()
        _traces[2].x = buf[2].x.toarray()
        _traces[2].y = buf[2].y.toarray()

        console.log(_traces)

        this.traces = _traces;
      }, 200);
    },
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
