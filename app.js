process.env.NODE_ENV = process.env.NODE_ENV || 'developmnet';

require('dotenv').config()
var createError = require('http-errors');
var express = require('express');


// installed 3rd party packages
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// let cors = require('cors');

// modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// var cors = require('cors')
var app = express();


var bodyParser = require('body-parser');


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended : false}) )

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors);


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL , { 
  useNewUrlParser: true, useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Connected To Database'))



let indexRouter = require('./routes/index');

let booksRouter = require("./routes/book");

//setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//initialize flash
app.use(flash());

//intialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create usermodel instance
let userModel = require('./models/user');
let User = userModel.User;

//implement a user authenticaion Strategy
passport.use(User.createStrategy());

//serialize and deserialize user object info -encrypt and decrypt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use("/book-list", booksRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
