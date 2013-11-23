var routes = {};
var fs = require('fs');
var sd = require('./library.js').sd;
var message_page = fs.readFileSync('./public/html/message.html','utf-8');
var homeTemplate = fs.readFileSync('./template','utf-8');

routes.getHomePage = function(req,res){
	fs.readFile('./public/html/index.html','utf-8',function(err,data){
		if(err) throw err;
		data = data.replace(/{home}/,homeTemplate);
		res.status(200).send(data);
	})
};

routes.getAddPage = function(req,res){
	fs.readFile('./public/html/add.html','utf-8',function(err,data){
		if(err) throw err;
		data = data.replace(/{home}/,homeTemplate);
		res.status(200).send(data);
	})
};

routes.getList = function(req,res){
	fs.readFile('./record.txt','utf-8',function(err,data){
		if(err) throw err;
		var result = sd.list(data);
		result = result.replace(/{home}/,homeTemplate);
		res.status(200).send(result);
	})
};

routes.getSearchPage = function(req,res){
	fs.readFile('./public/html/search.html','utf-8',function(err,data){
		if(err) throw err;
		data = data.replace(/{home}/,homeTemplate);
		res.status(200).send(data);
	})
};

routes.getDeletePage = function(req,res){
	fs.readFile('./public/html/delete.html','utf-8',function(err,data){
		if(err) throw err;
		data = data.replace(/{home}/,homeTemplate);
		res.status(200).send(data);
	});
};

routes.getValidations = function(req,res){
	fs.readFile('./public/javascript/validation.js','utf-8',function(err,data){
		if(err) throw err;
		res.status(200).send(data);
	});
};

var getPostValues = function(input){
	var details = [];
	var inputs = input.split('&');
	inputs.forEach(function(field){
		details.push((field.split('=')[1]));
	});
	if(details[1])
		details[1] = details[1].replace(/\+/g,' ').replace(/%40/g,'@');
	return details;
};

routes.addRecord = function(req,res){
	var onReadData = function(input){
		var details = getPostValues(input);
		var result = sd.addDetail(details[0],details[1],details[2]);
		result = result.replace(/{home}/,homeTemplate);
		result = result.replace(/{home}/,'');
		res.status(200).send(result);
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

routes.searchRecord = function(req,res){
	var onReadData = function(input){
		input = input + '&';
  		var details = getPostValues(input);
		var result = sd.searchRecord(JSON.stringify(sd.records),details[0]);
		result = result.replace(/{home}/,homeTemplate);
		res.status(200).send(result);
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

routes.deleteRecord = function(req,res){
	var onReadData = function(input){
		input = input + '&';
  		var details = getPostValues(input);
		var result = sd.removeRecord(JSON.stringify(sd.records),details[0]);
		result = result.replace(/{home}/,homeTemplate);
		result = result.replace(/{home}/,'');
		res.status(200).send(result);
	};
	req.setEncoding('utf8');
	req.on('data',onReadData);
};

routes.getUndefinedPage = function(req,res){
	var err = '<h1>404</h1><h2>The Requested Page  is not available</h2>';
	var msg = '<h3>The available functionalities are<br/> 1. Add <br/> 2. List <br/> 3. Search <br/> 4. Delete</h3>';
	message_page = message_page.replace(/{home}/,homeTemplate);
	message_page = message_page.replace(/{message}/,err+msg);	
	res.status(404).send(message_page);
};

routes.delete
exports.routes = routes;