const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcrypt');

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

//fire a function after doc is saved in db
userSchema.post('save', (doc, next) => {
  console.log("new user was created", doc)
  next()
})

//fire a function before doc is saved in db
userSchema.pre('save', function (next) {
  console.log("new user about to save", this)
  next()
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

const User = mongoose.model("user", userSchema)

module.exports = User;