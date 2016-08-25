var jwt_secret = 'wdi4team5jwtsecret';
jwt = require('jsonwebtoken');

module.exports = function(app,passport){
  app.route('/API/signup')
  .post(passport.authenticate('local-signup'),function(req,res){
    if(req.user){
      var payload = {
        id: req.user.id,
        email: req.user.email
      };
      var jwt_token = jwt.sign(payload, jwt_secret);
      var jsonObj = {"id":req.session.passport.user,"token":jwt_token};
      res.json(jsonObj);
    }
  });
  app.route('/API/login')
  .post(passport.authenticate('local-login'),function(req,res){
    if(req.user){
      var payload = {
        id: req.user.id,
        email: req.user.email
      };
      var jwt_token = jwt.sign(payload, jwt_secret);
      var jsonObj = {"id":req.session.passport.user,"token":jwt_token};
      res.json(jsonObj);
    }else {
      res.status(404).send({
        message: 'Oops'
      });
    }
  });
  app.route('/API/authentication')
  .post(function(req,res,next){

    if (req.user.id == req.body.user) res.status(200).send({message:'ok'});

    // else redirect them to the home page
    res.status(401).send({message:'oops'});
  });
  app.get('/API/logout', function(req, res) {
    req.logout();
    res.status(200).send({message:'logged out!'});
  });




};
