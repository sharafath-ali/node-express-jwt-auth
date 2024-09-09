const express = require('express');
const mongoose = require('mongoose');
var morgan = require('morgan');
const AuthRoutes = require('./routes/authRoutes');
const { authRequire } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();
const dbUrl = "mongodb+srv://Sharu:HmANYffZgWLEpRVk@net-ninja-node-crash-co.vssl4.mongodb.net/Net-Ninja-Nodejs-Crash-Course?retryWrites=true&w=majority&appName=Net-Ninja-Node-Crash-Course";

// middleware

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
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

app.use(AuthRoutes)

// routes
app.get('/', authRequire, (req, res) => res.render('home'));

app.get('/smoothies', authRequire, (req, res) => res.render('smoothies'));

// app.get('/set-cookie', (req, res) => {
//   res.setHeader('Set-Cookie', 'user=Sharafath; Max-Age=86400; HttpOnly');
//   res.setHeader('Set-Cookie', [
//     'username=Sharafath; Max-Age=86400; HttpOnly',
//     'role=admin; Max-Age=86400; HttpOnly',
//     'preferences=dark_mode; Max-Age=86400; HttpOnly'
//   ]);
//   res.send('Cookie has been set');
// })

// app.get('/get-cookie', (req, res) => {
//   res.json(req.headers.cookie);
// })