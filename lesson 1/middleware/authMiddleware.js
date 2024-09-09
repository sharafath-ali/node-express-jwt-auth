const jwt = require('jsonwebtoken');

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

module.exports = { authRequire }