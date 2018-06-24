module.exports = function(req, res, next) {
  if(!req.session.isBlogger) res.badRequest('Require blogger.');
  else return next();
}