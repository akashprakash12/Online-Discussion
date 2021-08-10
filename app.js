var createError = require('http-errors');
var express = require('express');
var path = require('path');
var expressSessionHandler=require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars')
var fileUp=require("express-fileupload");
var db=require('./config/connection')
var axios=require('axios')


var indexRouter = require('./routes/index');
var AdminRouter= require('./routes/admin');
const fileUpload = require('express-fileupload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.engine('hbs',hbs({extname:"hbs",defaultLayout:'layout',layoutsDir:__dirname+'/views/layout',partialsDir:__dirname+'/views/partials'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSessionHandler({secret:"keefgfg",cookie: {expires: new Date(253402300000000)}, resave: false,
saveUninitialized: true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

db.connect((err)=>{
  if(err)
  console.log("error"+err);
  else
  console.log("database conected");
})


app.use('/', indexRouter);
app.use('/admin',AdminRouter);


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
