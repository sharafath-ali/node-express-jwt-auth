const User = require('../models/User');

const errorHandler = (err) => {
  const error = { email: "", password: "" }

  if (err.code === 11000) {
    error.email = "this email was associated with another account, please login to continue";

    return error;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((err) => {
      error[err.properties.path] = err.properties.message
    })
  }

  return error;
}

const getSignupPage = (req, res) => {
  res.render('signup');
}

const getLoginPage = (req, res) => {
  res.render('login');
}

const postSignUp = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
  } catch (err) {
    const errors = errorHandler(err)
    res.status(400).json(errors)
  }
}

const postLoginPage = (req, res) => {
  console.log(req.body)
  res.send('signup');
}

module.exports = { getSignupPage, getLoginPage, postSignUp, postLoginPage };