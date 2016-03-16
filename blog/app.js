var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');
var users = require('./routes/users');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer =require('multer');
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./public/images/user')
  },
  filename: function(req,file,cb){
    cb(null,file.originalname)
  }
});
var upload = multer({storage: storage});
var cpUpload = upload.any();

var app = express();

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log',{flags: 'a'});
var errorLog = fs.createWriteStream('error.log',{flags: 'a'});
// view engine setup
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger({stream: accessLog}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err,req,res,next){
  var meta = '['+new Date()+']' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
})

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000*60*60*24*30},
  store: new MongoStore({
    // db: settings.db,
    // host: settings.host,
    // port: settings.port
    url: 'mongodb://localhost/blog'
  })
}));
app.use(flash());
app.use(cpUpload);

if(app.get('env') === 'development'){
  app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.render('error',{
      message: err.message,
      error: err
    })
  })
}

app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    error: {}
  })
})

routes(app);

app.listen(app.get('port'),function(){
  console.log('Express server listening on port '+app.get('port'));
});
