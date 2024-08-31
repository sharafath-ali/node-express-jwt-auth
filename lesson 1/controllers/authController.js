const getSignupPage = (req, res) => {
  res.render('signup');
}

const getLoginPage = (req, res) => {
  res.render('login');
}

const postSignUp = (req, res) => {
  res.send('signup');
}

const postLoginPage = (req, res) => {
  console.log(req.body)
  res.send('signup');
}

module.exports = { getSignupPage, getLoginPage, postSignUp, postLoginPage };