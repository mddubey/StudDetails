var handler = {};
var fs = require('fs');
var sd = require('./library.js').sd;
var homeTemplate = fs.readFileSync('./template','utf-8');
var message_page = fs.readFileSync('./public/message.html','utf-8');

handler.addRecord = function(req,res){
    var result = sd.addDetail(req.body);
    res.render('list',{message:result.message,list:result.record});
};

handler.searchRecord = function(req,res){
    var result = sd.searchRecord(sd.records,req.body.RollNo);
    res.render('list',{message:result.message,list:result.record});
};

handler.deleteRecord = function(req,res){
    var result = sd.removeRecord(sd.records,req.body.RollNo);
    res.render('list',{message:result.message,list:result.record});
};

handler.getUndefinedPage = function(req,res){
        var err = '<h1>404</h1><h2>The Requested Page is not available</h2>';
        var msg = '<h3>The available functionalities are<br/> 1. Add <br/> 2. List <br/> 3. Search <br/> 4. Delete</h3>';
        message_page = message_page.replace(/{home}/,homeTemplate);
        message_page = message_page.replace(/{message}/,err+msg);        
        res.status(404).send(message_page);
};

exports.handler = handler;