<template>
  <v-app class="app-container">
    <v-app-bar flat clipped-left app dense :elevation="0"> Header </v-app-bar>
    <v-navigation-drawer
      app
      left
      asbolute
      clipped
      permanent
      class="app-nav-drawer"
    >
    </v-navigation-drawer>
    <v-main>
      <v-container fluid class="app-main-container">
        <v-btn outlined tile x-small @click="showMessage">Click</v-btn>
      </v-container>
    </v-main>
    <v-footer app> Footer </v-footer>
  </v-app>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  name: "App",
  components: {},
  data() {
    return {
      message: "Hello from vue, electron and vuetify!"
    };
  },
  methods: {
    async showMessage(){
      await ipcRenderer.invoke("message:box", this.message)
    },
    onClickMenuItem(event, tree) {
      switch (tree[0]) {
        case "File":
          switch (tree[1]) {
            case "Open":
              console.log("Open");
              break;
            case "Save":
              console.log("Save");
              break;
            case "Save as..":
              console.log("Save as..");
              break;
            default:
              break;
          }
          break;
        case "Settings":
          switch (tree[1]) {
            case "Port": {
              console.log("Port");
              break;
            }
            default:
              break;
          }
          break;
        case "Help":
          switch (tree[1]) {
            case "Learn More":
              console.log("Learn More");
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
  },
  async mounted() {
    await ipcRenderer.invoke("dom:loaded");
    ipcRenderer.on("menu:action", this.onClickMenuItem);
  },
};
</script>

<style scoped>
.app-main-container {
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.app-container {
  overflow-x: auto;
  min-width: 400px;
}

</style>
