<template>
  <div>
    <canvas style="width: 100%" id="my_canvas"></canvas>
  </div>
</template>

<script>
import WebGLplot, { WebglLine, ColorRGBA } from "webgl-plot";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data(){},
  methods: {},
  mounted() {
    const canvas = document.getElementById("my_canvas");
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    const numX = Math.round(canvas.width);
    const wglp = new WebGLplot(canvas);

    let numLines = 1;
    // let scaleY = 1;
    //let lines: WebglLine[];
    // let fpsDivder = 1;
    // let fpsCounter = 0;
    // new data per frame
    // let newDataSize = 1;
    // const lineNumList = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

    // const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
    // const line = new WebglLine(color, canvas.height);

    wglp.removeAllLines();
    for (let i = 0; i < numLines; i++) {
      const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
      const line = new WebglLine(color, numX);
      line.lineSpaceX(-1, 2 / numX);
      wglp.addLine(line);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
