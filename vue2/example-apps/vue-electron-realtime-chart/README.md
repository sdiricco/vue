# vue-desktop-realtime-chart

## Installa yarn

Utilizzeremo [yarn](https://yarnpkg.com/) come gestore di pacchetti. 

## Installa vue

Installa vue-cli
```bash
yarn install -g @vue/cli
```

Crea un progetto
```bash
vue create vue-desktop
```

## Aggiungi il plugin electron

Enter in your app
```bash
cd vue-desktop
```

Add electron
```bash
vue add electron-builder
```

To execute the app
```bash
yarn electron:serve
```

L'ultima versione di electron è la v16.x.x o maggiore. Installando questo plugin potrai ottenere al massimo la v11.x.x. Il consiglio è quello di provare ad aggiornare electron manualmente ed eventualmente reinstallando nel caso ci fossero problemi

```bash
yarn add electron --save-dev
```

## Aggiungi chartjs

Esiste una versione specifica di chartjs per vue, [vue-chartjs](https://vue-chartjs.org/). Questa versione supporta solo la v2.x.x di chartjs.

To install chartjs, you shall install chartjs-v2 because `vue-chartjs` support only this version and so chartjs-plugin-streaming-v1

```bash
yarn add chart.js@2 vue-chartjs
```

### Aggiungi il plugin streaming di chartjs

Visita la pagina ufficiale [chartjs-plugin-streaming](https://nagix.github.io/chartjs-plugin-streaming/latest/)

Dovrai installare la v1.x.x del plugin streaming per chartjs perchè è la versione compatibile con la v2.x.x di chartjs, [qui](https://nagix.github.io/chartjs-plugin-streaming/latest/tutorials/vue/install.html) puoi trovare maggiori informazioni

```bash
yarn add chartjs-plugin-streaming@1 --save
```

