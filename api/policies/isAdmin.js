module.exports = async function(req, res, next) {
  let currentUser = await User.findOne({ id: req.session.login })
  .intercept(err => {
    sails.log.error('Cannot find user');
    sails.log.error(err);
    return err;
  });
  if(!currentUser.isAdmin) res.forbidden('Require Admin');
  else return next();
}