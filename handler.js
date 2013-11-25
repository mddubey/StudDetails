var handler = {};
var fs = require('fs');
var sd = require('./library.js').sd;
var profiles = JSON.parse(fs.readFileSync('userProfile.txt','utf-8'));

var isUserAuthenticate = function(userName,password){
    var profile = profiles[userName];
    var validUser = profile && (profile.password === password);
    return validUser;
};

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
    var getList = function () {
        if(JSON.stringify(sd.records)=='{}')
            res.render('list',{message:'No Record available.',list:{}});
        else
            res.render('list',{message:'Student List',list:sd.records});
    };
    req.cookies.login && getList() || res.render('login',{message:'Login First'});
};

handler.authenticate = function(req,res){
    var userID = req.body.userID;
    var password = req.body.password;
    if(isUserAuthenticate(userID,password)){
        res.cookie('login','1');
        res.render('home');
    }
    else
        res.render('login',{message:'Username or password is incorrect'});
};

exports.handler = handler;