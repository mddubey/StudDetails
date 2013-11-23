var express = require('express');
var fs = require('fs');
var routes = require('./handler.js').routes;
var app = express();

app.get('/',routes.getHomePage);

app.get('/html/add.html',routes.getAddPage);
app.get('/html/list.html',routes.getList);
app.get('/html/search.html',routes.getSearchPage);
app.get('/html/delete.html',routes.getDeletePage);

app.get('/javascript/validation.js',routes.getValidations);

app.post('/add',routes.addRecord);

app.post('/search',routes.searchRecord);

app.post('/delete',routes.deleteRecord);

app.get('/*',routes.getUndefinedPage);


app.listen(8088);