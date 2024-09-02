const mongoose = require('mongoose');
var validator = require('validator');

const userSchema = new mongoose.Schema({
  // userName: { type: String, required: true, unique: true, lowercase: true },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [(value) => validator.isEmail(value), "please enter a correct email"]
  },
  password: {
    type: String,
    required: [true, "please enter an password"],
    minlength: [6, "minimum password length is 6 character"]
  }
})

const User = mongoose.model("user", userSchema)

module.exports = User;