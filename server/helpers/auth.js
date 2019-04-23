const jwt = require('jsonwebtoken')

module.exports = {
  createToken: user => {
    return jwt.sign({
      _id: user._id,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET)
  },
  verifyToken: token => jwt.verify(token, process.env.JWT_SECRET)
}
