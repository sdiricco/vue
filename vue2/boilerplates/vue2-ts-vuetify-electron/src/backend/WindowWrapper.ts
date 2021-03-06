import EventEmitter from "eventemitter3"
import { BrowserWindow, } from "electron";

import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

export class WindowWrapper extends EventEmitter {
  devServer: any;
  electronNodeIntegration: any;
  instance: any;
  constructor() {
    super();
    this.devServer = process.env.WEBPACK_DEV_SERVER_URL
    this.electronNodeIntegration = process.env.ELECTRON_NODE_INTEGRATION
    this.instance = undefined;
    this.onClose = this.onClose.bind(this)
  }
  onClose(){
    console.log("on close");
  }

  async loadWindow(){
    if (this.devServer) {
      await this.loadDevWindow()
      return;
    }
    this.loadProdWindow();
  }

  async loadProdWindow(){
    createProtocol("app");
    this.instance.loadURL("app://./index.html");
  }

  async loadDevWindow(){
    await this.instance.loadURL(this.devServer);
    this.instance.webContents.openDevTools();
  }
  async create(){
    this.instance = new BrowserWindow({
      show: false,
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 400,
      webPreferences: {
        nodeIntegration: this.electronNodeIntegration, 
        contextIsolation: !this.electronNodeIntegration,
        enableRemoteModule: true,
        backgroundThrottling: false,
      },
    });
    this.instance.on("close", this.onClose);
    this.instance.maximize();
    this.instance.show();
    this.loadWindow();
  }

  send(channel: any, payload: any){
    this.instance.webContents.send(channel, payload)
  }
}
