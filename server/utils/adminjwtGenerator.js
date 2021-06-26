const jwt = require('jsonwebtoken')
require('dotenv').config()

function jwtGenerator(id) {
  const payload = {
    admin: {
      id: id,
    },
  }

  return jwt.sign(payload, '12345', {expiresIn: '1h'})
}

module.exports = jwtGenerator
