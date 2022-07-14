<template>
  <div class="line-plot-wrapper">
    <div :ref="this.uuid" class="peaks-plot"></div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
export default {
  name: "LinePlot",
  props: {
    title: String, //Titolo del grafico
    traces: Array,
    threshold: Number, //Valore della threshold plottata sul grafico in rosso
    xTitle: String,
    yTitle: String,
    xRange: Array,
    yRange: Array,
    height: Number,
    showLegend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uuid: Math.random()
        .toString(36)
        .substr(2, 15),
      firstExec: true,
      loading: false,
      config: {
        responsive: true,
        toImageButtonOptions: {
          format: "png", // one of png, svg, jpeg, webp
          filename: "",
          width: 1100,
          scale: 1, // Multiply title/legend/axis/canvas sizes by this factor,
        },
      },
    };
  },
  computed: {
    chart: function() {
      return {
        layout: {
          showlegend: this.showLegend,
          margin: {
            l: 80,
            r: 35,
            b: 70,
            t: 20,
            pad: 2,
          },
          title: {
            text: this.title || "",
            font: {
              family: "Poppins",
              size: 22,
            },
          },
          autosize: true,
          xaxis: {
            tickangle: 0,
            tickfont: { family: "Poppins", size: 12 },
            title: {
              text: this.xTitle,
              font: {
                family: "Poppins",
                size: 16,
              },
            },
            gridcolor: "rgba(150,153,162,0.6)",
            gridwidth: 1,
            linecolor: "rgba(150,153,162,0.6)",
            linewidth: 2,
            range: this.xRange || null,
          },
          yaxis: {
            title: {
              text: this.yTitle,
              font: {
                family: "Poppins",
                size: 16,
              },
            },
            gridcolor: "rgba(150,153,162,0.4)",
            gridwidth: 1,
            range: this.yRange || null,
          },
          height: this.height || 650,
          bargap: 0.2,
          hovermode: "closest",
          paper_bgcolor: "rgba(45,48,65,1)",
          plot_bgcolor: "rgba(45,48,65,1)",
          font: {
            family: "Poppins",
            size: 14,
            color: "rgb(255,255,255)",
          },
          shapes: this.threshold
            ? [
                {
                  type: "line",
                  xref: "paper",
                  x0: 0,
                  y0: this.threshold,
                  x1: 1,
                  y1: this.threshold,
                  line: {
                    color: "rgb(255, 0, 0)",
                    width: 3,
                    dash: "dashdot",
                  },
                },
              ]
            : [],
        },
      };
    },
  },
  mounted() {
    Plotly.newPlot(this.$refs[this.uuid], this.traces, this.chart.layout, this.config);
  },
  watch: {
    update: {
      deep: true,
      handler: function(){
          Plotly.relayout(this.$refs[this.uuid], this.minuteView);
          Plotly.extendTraces(this.$refs[this.uuid], this.traces, [0])
          // Plotly.react(this.$refs[this.uuid], this.traces, this.chart.layout, this.config);
      }
    },
    traces: {
      handler: function() {
        if (this.$refs[this.uuid]) {
          // Plotly.relayout(this.$refs[this.uuid], this.xaxis);
          // Plotly.extendTraces(this.$refs[this.uuid], this.traces, [0])
          Plotly.react(this.$refs[this.uuid], this.traces, this.chart.layout, this.config);
        }
      },
      deep: true,
    },
    chart: {
      handler: function() {
        if (this.$refs[this.uuid]) {
          Plotly.newPlot(this.$refs[this.uuid], this.traces, this.chart.layout, this.config);
        }
      },
      deep: true,
    },
    height: {
      handler: function() {
        if (this.$refs[this.uuid]) {
          Plotly.newPlot(this.$refs[this.uuid], this.traces, this.chart.layout, this.config);
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
p {
  color: white;
}
.hovertext > rect {
  fill: rgba(0, 0, 0, 0.116) !important;
}
.line-plot-wrapper {
  height: fit-content;
  padding-bottom: 20px;
}
</style>
