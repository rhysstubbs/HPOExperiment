const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('morgan');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router.get('/', function (req, res) {
    res.render('index', {title: 'Hyper-Parameter Optimisation'});
}));

app.use(function (req, res) {
    res.redirect('/');
});

// error handler
app.use(function (err, req, res) {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('errors/error');

});

module.exports = app;