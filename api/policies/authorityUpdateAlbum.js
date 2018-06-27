module.exports = async function(req, res, next) {
  //is admin or blog's owner
  let currentUser = await User.findOne({ id: req.session.login })
  .intercept(err => {
    sails.log.error('Cannot find user');
    sails.log.error(err);
    return err;
  });

  let album = await Album.findOne({ id: req.param('id') })
  .intercept(err => {
      sails.log.error('Cannot find album');
      sails.log.error(err);
      return err;
  });
  
  if(!album) {
    return res.notFound('No such album');
  }

  if(req.session.login == album.owner || currentUser.isAdmin) return next();
  else res.forbidden('Require admin or owner');
}