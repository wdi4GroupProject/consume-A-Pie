var mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }

});

userSchema.pre('save', function(next) {
  var user = this;
  //generate the saltRounds
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    //hash it
    bcrypt.hash(user.local.password, salt, function(err, hash) {
      //store hash pwd
      user.local.password = hash;
      next();
    });
  });

});
userSchema.methods.authenticate = function (password,callback){
  //compare password
  bcrypt.compare(password,this.local.password,function(err,is_match){
    callback(null,is_match);
  });

};
module.exports = mongoose.model('User', userSchema);
