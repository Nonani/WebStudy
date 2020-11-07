var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var logger = require('morgan');

var db = require('./lib/conn_database.js');
var conn = db.init();
db.connect(conn);   //db 연결

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()

}))

var passport = require('passport')
  , LocalStrategy = require('passport-local')
  .Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user)
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id)
    var sql = 'SELECT * FROM user where id = ?'
    conn.query(sql, id, function(err, result, field){
        if(err) throw err;
        if(result.length===0){  
            console.log("결과 없음");
          done(null, false, { message: 'Incorrect' });
        }else{
          console.log(result);
          var json = JSON.stringify(result[0]);
          var userinfo = JSON.parse(json);
          // console.log("userinfo " + userinfo);
          done(null, userinfo);
        }
    });
    
  });

  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pwd'
  },
  function(username, password, done) {
    console.log('LocalStrategy', username, password);
    var sql = 'SELECT * FROM user where id = ? and pwd = ?'
    conn.query(sql, [username, password], function(err, result, field){
        if(err) throw err;
        if(result.length===0){  
            console.log("결과 없음");
          return done(null, false, { message: 'Incorrect' });
        }else{
          console.log(result);
          var json = JSON.stringify(result[0]);
          var userinfo = JSON.parse(json);
          console.log("userinfo " + userinfo);
          return done(null, userinfo);
        }
    });



    // var sql = 'SELECT * FROM USER WHERE ID=? AND PWD=?';
    // conn.query(sql , [username, password], function (err, result) {
    //   if(err) console.log('mysql 에러');  

    //   // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
    //   if(result.length === 0){
    //     console.log("결과 없음");
    //     return done(null, false, { message: 'Incorrect' });
    //   }else{
    //     console.log(result);
    //     var json = JSON.stringify(result[0]);
    //     var userinfo = JSON.parse(json);
    //     console.log("userinfo " + userinfo);
    //     return done(null, userinfo);  // result값으로 받아진 회원정보를 return해줌
    //   }
    // })
  }
));
app.post('/auth/login_process',
  passport.authenticate('local', { successRedirect: '/users',
                                   failureRedirect: '/auth/login'})
);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
