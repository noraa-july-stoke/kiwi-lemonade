// the index router is defined as a function by convention
module.exports = (router) => {
  router.prefix('/api');
  // router.use('/users', require('./users'));
  router.use("", require("./api"));
}
