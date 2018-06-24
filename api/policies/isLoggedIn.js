module.exports = function(req, res, next) {
  if(!req.session.login) res.badRequest('Require login.');
  else return next();
}