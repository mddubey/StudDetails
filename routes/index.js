
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.redirect('/login');
};

exports.login = function(req, res){
	req.cookies.remember && res.render('home') || res.render('login',{message:'User Login'});
};

exports.home = function(req, res){
  req.cookies.login && res.render('home') || res.render('login',{message:'Login First'});
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