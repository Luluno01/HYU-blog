module.exports = async function(req, res, next) {
    //The album must exist and it belongs to the logged in user.
    let album = await Album.findOne({ id: req.param('album') })
    .intercept(err => {
      sails.log.error('Cannot find album');
      sails.log.error(err);
      return err;
    });

    if(!album) res.forbidden('No such album');

    let currentUser = await User.findOne({ id: req.session.login })
    .intercept(err => {
      sails.log.error('Cannot find user');
      sails.log.error(err);
      return err;
    });
    if(currentUser.id != album.owner) res.forbidden('The album doesn\'t belong to you');
    else return next();
  }