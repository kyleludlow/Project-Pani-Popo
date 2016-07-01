module.exports = function(app, passport) {
  //route for homepage
  app.get('/', function(req, res) {
    res.render(index.ejs);
  });

  //route for showing the profile page
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
