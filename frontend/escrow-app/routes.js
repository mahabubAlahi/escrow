const routes = require('next-routes')();

routes
  .add('/arbitor/unlock', '/arbitor/unlock')
  .add('/arbitor/:address', '/arbitor/show');

module.exports = routes;
