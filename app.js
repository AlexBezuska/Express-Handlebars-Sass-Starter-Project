var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var autoprefixer  = require('express-autoprefixer');

var routes = {
  home: require('./routes/home'),
  about: require('./routes/about')
};

var app = express();

app.set('views', path.join(__dirname, 'views'));
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    ifEqual: require("./helpers/ifEqual.js"),
    count: require("./helpers/count.js")
  }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'scss/'),
  dest: path.join(__dirname, 'public/'),
  debug: true,
  sourceMap: true
}));
app.use(autoprefixer({ browsers: 'last 2 versions' }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.home);
app.use('/about', routes.about);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
