module.exports = function(req, res, next) {
  if(req.session.login != req.param('owner')) res.forbidden('Not owner');
  else return next();
}