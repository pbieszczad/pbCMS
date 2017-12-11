require('rootpath')();
var express = require('express');
var ejs = require('ejs');
var app = express();
var compression = require('compression');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var config = require('config.json');
var mongoose = require('mongoose');
var api = require('controllers/api/api');
mongoose.connect(config.connectionString);
var db = mongoose.connection;
// enable ejs templates to have .html extension
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// set default views folder
app.set('views', __dirname + '/../client');

// enable gzip compression
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: config.secret,
    store: new MongoStore({ url: config.connectionString }),
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    if (!config.installed && req.path !== '/install') {
        return res.redirect('/install');
    }

    next();
});
app.use('/api', api);
// pozwolenie JWT dla angulara
app.get('/token', function (req, res) { 
    res.send(req.session.token);
});

// standalone pages
app.use('/install', require('./controllers/install.controller'));
app.use('/login', require('./controllers/login.controller'));

app.use('/admin', require('./controllers/admin.controller'));


// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 3000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});