module.exports = {
  db: process.env.MONGODB_URI, // diff url for heroku
  sessionSecret: 'productionSessionSecret'
};
