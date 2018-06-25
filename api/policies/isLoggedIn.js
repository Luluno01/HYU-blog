module.exports = function(req, res, next) {
  // sails.log.debug(req.session);
  if(!req.session.login) res.forbidden('Require login');
  else return next();
}