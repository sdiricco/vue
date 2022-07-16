<script>
import { Line } from "vue-chartjs";
import "chartjs-plugin-streaming";

export default {
  extends: Line,
  data() {
    return {
      data: {
        datasets: [
          {
            label: "Dataset 1",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1,
            //backgroundColor: "rgb(54, 162, 235)",
            data: [],
          },
        ],
      },
      options: {
        maintainAspectRatio:false,
        responsive: true,
        aspectRatio: 1,
        responsiveAnimationDuration: 0,
        animation: false, //disable animation to improve performance
        plugins: {
          streaming: {
            frameRate: 60, // chart is drawn 30 times every second
          },
        },
        legend: {
          display: true,
          position: "top",
          fullWidth: true,
        },
        title: {
          display: true,
          position: "top",
          fontSize: "24",
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontColor: "#666",
          fontStyle: "bold",
          padding: 10,
          text: "Title of graph",
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontColor: "#666",
                fontFamily:
                  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize: 12,
                fontStyle: "normal",
              },
              type: "realtime",
              display: true,
              title: {
                display: true,
                text: "Time",
              },
              realtime: {
                duration: 10000,
                refresh: 1000,
                ttl: 60000,
                delay: 5000,
                onRefresh: this.onRefresh,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Y value",
                fontColor: "#666",
                fontFamily:
                  "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize: 12,
                fontStyle: "normal",
              },
              type: "linear",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    onRefresh(chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push({
          x: Date.now(),
          y: Math.random(),
        });
      });
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>
