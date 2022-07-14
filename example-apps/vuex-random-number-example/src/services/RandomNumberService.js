const { VUE_APP_REMOTE_ADDRESS: ADDRESS, VUE_APP_PORT: PORT } = process.env;

const url = `//${ADDRESS}:${PORT}/random`;

export function getRandomNumber() {
  return fetch(url, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json());
}
