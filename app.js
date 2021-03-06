
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import path from 'path';
import createError from 'http-errors';


import express from 'express';
import indexRouter from './src/routes/index.js'
import usersRouter from './src/routes/users.js'
import fileRouter from './src/routes/file.js'
import { fileURLToPath } from 'url'

//fix for __dirname in es module 
//refer https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filenmae = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filenmae)


const app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

// console.log("Redsadsafd");

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', fileRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

export default app
