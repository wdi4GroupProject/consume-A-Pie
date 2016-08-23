module.exports = function(app,passport){
  app.route('/API/signup')
  .post(passport.authenticate('loclocal-signup'),{

  });






};
