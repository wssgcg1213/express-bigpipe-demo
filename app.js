var express = require('express');
    path = require('path'),
    favicon = require('static-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    routes = require('./routes/index'),
    pipebig = require('./pipebig'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pipebig({
    basedir: __dirname + '/public/'
}));
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
    res.end(JSON.stringify(err))
});


module.exports = app;
