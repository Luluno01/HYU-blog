module.exports = function(req, res, next) {
  //Is this id the owner of something?
  if(req.session.login != req.param('owner')) res.forbidden('Not owner');
  else return next();
}