<template>
  <Chart :data="data" :options="options"/>
</template>

<script>
const { ipcRenderer } = require('electron');
export default {
  name: 'WrapperChartTest',
  components: {
     Chart: () => import('./Chart.vue')
  },
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
            frameRate: 5 , // chart is drawn 30 times every second
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
                ttl: 20000,
                delay: 1000,
                // onRefresh: this.onRefresh,
              },
              ticks: {
                display: true,
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
                display: true,
                max: 5,
                min: -5
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
  mounted(){
    ipcRenderer.on("data", (event, dataObj)=>{
      this.data.datasets.forEach((dataset) => {
        dataset.data = dataset.data.concat(dataObj);
      });
    })
    // setInterval(()=>{
    //     this.data.datasets.forEach((dataset) => {
    //       dataset.data.push({
    //         x: Date.now(),
    //         y: Math.random(),
    //       });
    //   });
    // }, 100)
  }
};
</script>
