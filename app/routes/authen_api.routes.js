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
      var expiryObj = {
        expiresIn: '10h'
      };
      var jwt_token = jwt.sign(payload, jwt_secret,expiryObj);
      var jsonObj = {"id":req.session.passport.user,"token":jwt_token};
      res.json(jsonObj);
    }else {
      res.status(404).send({
        message: 'Oops'
      });
    }
  });
  app.route('/API/login')
  .post(passport.authenticate('local-login'),function(req,res){
    if(req.user){
      var payload = {
        id: req.user.id,
        email: req.user.email
      };
      var expiryObj = {
        expiresIn: '10h'
      };
      var jwt_token = jwt.sign(payload, jwt_secret,expiryObj);
      var jsonObj = {"id":req.session.passport.user,"token":jwt_token};
      res.json(jsonObj);
    }else {
      res.status(404).send({
        message: 'Oops'
      });
    }
  });






};
