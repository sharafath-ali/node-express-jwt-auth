const jwt = require('jsonwebtoken');
const User = require("../models/User")

const authRequire = (req, res, next) => {
  const token = req && req.cookies && req.cookies.jwt;
  console.log(token)
  if (token) {
    jwt.verify(token, "sharafath ali secret key", (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.redirect('/login')
      } else {
        console.log(decodedToken);
        next()
      }
    })
  }
  else {
    res.redirect('/login')
  }
}

const checkUser = (req, res, next) => {
  const token = req && req.cookies && req.cookies.jwt;
  console.log(token)
  if (token) {
    jwt.verify(token, "sharafath ali secret key", async (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.locals.user = null;
        next()
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id)
        res.locals.user = user;
        next()
      }
    })
  }
  else {
    res.locals.user = null;
    next()
  }
}

module.exports = { authRequire, checkUser }