module.exports = function(app,passport){
  app.route('/API/signup')
  .post(passport.authenticate('local-signup'),function(req,res){
    res.json(req.session.passport.user);
  });
  app.route('/API/login')
  .post(passport.authenticate('local-login'),function(req,res){
    res.json(req.session.passport.user);
  });
  





};
