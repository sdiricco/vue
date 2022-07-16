const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();

const ADDRESS = process.env.ADDRESS || '127.0.0.1';
const PORT = process.env.PORT || 5555;
const URL = `http://${ADDRESS}:${PORT}`;

app.use(cors());

const [, , , delay = 0] = process.argv;

app.get('/', (req, res) => {
  res.json({
    welcome: `Visit ${URL}/random to get a random number`
  });
});

app.get('/random', (req, res) => {
  setTimeout(() => {
    res.json({
      number: Math.random()
    });
  }, delay);
});

http.createServer(app).listen(PORT, ADDRESS, () => {
  console.log(`Listening on ${URL}`);
});
