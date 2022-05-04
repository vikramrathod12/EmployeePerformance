const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ['/login', '/logout','/currentuser','/allemployees','/insertdetails','/performancescore'],
    createProxyMiddleware({
      target: 'http://localhost:80',
    })
  );
};
