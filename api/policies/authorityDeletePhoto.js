module.exports = async function(req, res, next) {
  //is admin or blog's owner
  let currentUser = await User.findOne({ id: req.session.login })
  .intercept(err => {
    sails.log.error('Cannot find user');
    sails.log.error(err);
    return err;
  });

  let photo = await Photo.findOne({ id: req.param('id') })
  .intercept(err => {
      sails.log.error('Cannot find photo');
      sails.log.error(err);
      return err;
  });
  
  if(!photo) {
    return res.notFound('No such photo');
  }

  if(req.session.login == photo.owner || currentUser.isAdmin) return next();
  else res.forbidden('Require admin or owner');
}