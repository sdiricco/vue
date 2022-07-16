<template>
  <v-app class="app-container">
    <v-app-bar app dense> <v-btn outlined small tile>Play</v-btn> </v-app-bar>
    <v-main>
      <v-container>
        <!-- <MyChart :styles="myStyles" /> -->
        <WrapperChartTest :styles="myStyles" />
      </v-container>
    </v-main>

    <v-footer app> hello footer </v-footer>
  </v-app>
</template>

<script>
// import MyChart from "./components/MyChart.vue";
import WrapperChartTest from "./components/WrapperChartTest.vue";
const { ipcRenderer } = require('electron');

export default {
  name: "App",
  components: {
    // MyChart,
    WrapperChartTest
  },
  data() {
    return {
      height: 400,
    };
  },
  methods: {
    onData(event, data){
      console.log(data)
    }
  },
  computed: {
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative",
      };
    },
  },
  async mounted(){
    await ipcRenderer.invoke("dom:loaded");
    // ipcRenderer.on("data", this.onData)
  }
};
</script>

<style scoped>
.app-container {
  overflow-x: auto;
  min-width: 400px;
}
</style>
