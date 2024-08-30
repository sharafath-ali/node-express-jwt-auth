const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dbUrl = "mongodb+srv://Sharu:HmANYffZgWLEpRVk@net-ninja-node-crash-co.vssl4.mongodb.net/Net-Ninja-Nodejs-Crash-Course?retryWrites=true&w=majority&appName=Net-Ninja-Node-Crash-Course";

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection

const connected = mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
  console.log('Connected to MongoDB Atlas')
}).catch(err => console.log('Failed to connect to MongoDB Atlas', err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));