var handler = {};
var fs = require('fs');
var sd = require('./library.js').sd;

handler.addRecord = function(req,res){
    var result = sd.addDetail(req.body);
    res.render('list',{message:result.message,list:result.record});
};

handler.searchRecord = function(req,res){
    var result = sd.searchRecord(req.body.rollNo);
    res.render('list',{message:result.message,list:result.record});
};

handler.deleteRecord = function(req,res){
    var result = sd.removeRecord(req.body.rollNo);
    res.render('list',{message:result.message,list:result.record});
};

handler.showList = function(req,res){
    if(JSON.stringify(sd.records)=='{}')
        res.render('list',{message:'No Record available.',list:{}});
    else
        res.render('list',{message:'Student List',list:sd.records});
};

handler.login = function(req,res){
    fs.readFile('userProfile.txt','utf-8',function(err,data){
        if(err) throw err;
        var profiles = JSON.parse(data);
        var userID = req.body.userID;
        var password = req.body.password;
        profiles.hasOwnProperty(userID) && (profiles[userID].password === password)
        && res.render('home') || res.render('/');
    });
};

exports.handler = handler;