
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')



// ROUTES ---- var user = require('./routes/user');
var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/home');
var collection = require('./routes/collection');
var addProjects = require('./routes/addProjects');
var addEntries = require('./routes/addEntries');


var home_B = require('./routes/home_B');
var addProjects_B = require('./routes/addProjects_B');
var addEntries_B = require('./routes/addEntries_B');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// GET ROUTES ---- app.get('/users', user.list);
app.get('/', login.view);
app.get('/register', register.view);
app.get('/home', home.view);
app.get('/collection', collection.view);
app.get('/addProjects', addProjects.view);
app.get('/addEntries', addEntries.view);

app.get('/home_B', home_B.view);
app.get('/addProjects_B', addProjects_B.view);
app.get('/addEntries_B', addEntries_B.view);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
}); 
