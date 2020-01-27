const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.elis.rossum.ai/v1",
  timeout: 1000
  // headers: {'X-Custom-Header': 'Application?'}
});

module.exports = instance;
