const auth = require('express-basic-auth')

const basicAuth = (type = 'api') => {
  const users = {
    api: {
      key: process.env.API_USR,
      pass: process.env.API_PASSWORD
    }
  }

  const results = auth({
    users: {
      [users[type].key]: users[type].pass
    }
  })
  return results
}

module.exports = basicAuth
