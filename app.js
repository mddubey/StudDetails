 var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var handler = require('./handler').handler;

var app = express();
// all environments
app.set('port', process.env.PORT || 8088);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/add',routes.add);
app.get('/search',routes.search);
app.get('/delete',routes.delete);

app.get('/list',handler.showList);
app.post('/add',handler.addRecord);
app.post('/search',handler.searchRecord);
app.post('/delete',handler.deleteRecord);

// app.get('/*',function(req,res){
//     res.render('message');
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port '+ app.get('port'));
});
