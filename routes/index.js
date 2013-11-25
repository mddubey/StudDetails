
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.redirect('/login');
};

var isLoggedIn = function(req,res,page){
	req.cookies.login && res.render(page) || res.render('login',{message:'Login First'});	
}

exports.login = function(req, res){
	// req.cookies.login && res.render('home') ||
	res.render('login',{message:'User Login'});
};

exports.home = function(req, res){
  isLoggedIn(req,res,'home');
};

exports.add = function(req,res){
	isLoggedIn(req,res,'add');
};

exports.search = function(req,res){
	isLoggedIn(req,res,'search');
};

exports.delete = function(req,res){
	isLoggedIn(req,res,'delete');
};

exports.signout = function(req,res){
	res.clearCookie('login');
    res.redirect('/login');
};
