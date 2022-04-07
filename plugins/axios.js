const axios = require('axios');

const { stratzApiUrl, bearerToken } = require('../config.json');
const Authorization = `Bearer ${bearerToken}`


module.exports = {
  async getStratz(endpoint) {
    return await axios.get(`${stratzApiUrl}${endpoint}`, { headers: { Authorization } })
  },
  async postStratz(endpoint, payload) {
    return await axios.get(`${stratzApiUrl}${endpoint}`, payload, { headers: { Authorization } })
  }
}