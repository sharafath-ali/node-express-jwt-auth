const User = require('../models/User');
const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
  console.log(err.message)
  const error = { email: "", password: "" }

  if (err.code === 11000) {
    error.email = "this email was associated with another account, please login to continue";

    return error;
  }
  if (err.message === "email is not registered") {
    error.email = err.message;
    return error;
  }
  if (err.message === "incorrect password") {
    error.password = err.message;
    return error;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((err) => {
      error[err.properties.path] = err.properties.message
    })
  }

  return error;
}

const threeDay = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "sharafath ali secret key", {
    expiresIn: threeDay
  })
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
    const token = createToken(user?._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: threeDay * 1000 })
    res.status(201).json(user)
  } catch (err) {
    const errors = errorHandler(err)
    res.status(400).json(errors)
  }
}

const postLoginPage = async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password)
    console.log(user)
    const token = createToken(user._id)
    res.cookie("jwt", token, { httpOnly: true, maxAge: threeDay * 1000 })
    res.json(user);
  } catch (err) {
    const errors = errorHandler(err)
    res.json({ errors })
  }
}

module.exports = { getSignupPage, getLoginPage, postSignUp, postLoginPage };