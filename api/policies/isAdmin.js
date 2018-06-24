module.exports = async function(req, res, next) {
  var currentUser = await Blog.find({id: req.session.id});
  if(!currentUser.isAdmin) res.badRequest('Require Admin.');
  else return next();
}