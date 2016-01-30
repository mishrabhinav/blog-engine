
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send('respond with a resource');
};


/*
 * GET login page.
 */

exports.login = function(req, res, next) {
  res.render('login');
};

exports.register = function (req, res, next) {
  res.render('register');
};

exports.add = function (req, res, next) {
  if (!req.body.email) return next(new Error('Email ID not entered.'));
  var user = req.body.email;
  user.password = req.body.password;
  user.admin = false;
  req.models.User.insert(user, function(error, userResponse) {
    if(error) return next(error);
    res.send(userResponse);
  });
};

/*
 * GET logout route.
 */

exports.logout = function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
};


/*
 * POST authenticate route.
 */

exports.authenticate = function(req, res, next) {
  if (!req.body.email || !req.body.password)
    return res.render('login', {
      error: 'Please enter you email and password.'
    });

  req.models.User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(error, user){
       if(error) return next(error);
       if(!user) return res.render('login', {error: 'Incorrect email & password combination.'});

  req.session.user = user;
  req.session.admin = user.admin;
  res.redirect('/admin');
  })
};
