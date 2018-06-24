module.exports = async function(req, res, next) {
  var currentUser = await Blog.find({id: req.session.id});
  if(req.session.login == req.params.owner || currentUser.isAdmin) return next();
  else res.badRequest('Require Admin.');
}