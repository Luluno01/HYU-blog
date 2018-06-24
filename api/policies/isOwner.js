module.exports = function(req, res, next) {
  sails.log.debug(req.session.login, req.params.owner);
  if(req.session.login != req.param('owner')) res.badRequest('Not owner');
  else return next();
}