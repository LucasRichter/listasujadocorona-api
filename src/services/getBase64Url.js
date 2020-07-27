const axios = require('axios')
const { Buffer } = require('buffer')

async function getBase64(url) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(data, 'binary').toString('base64')
}

module.exports = getBase64