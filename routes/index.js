
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('home');
};

exports.add = function(req,res){
	res.render('add');
};

exports.search = function(req,res){
	res.render('search');
};

exports.delete = function(req,res){
	res.render('delete');
};

exports.list = function(req,res){
	res.render('list');
};