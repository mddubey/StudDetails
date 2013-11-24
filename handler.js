var handler = {};
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

exports.handler = handler;