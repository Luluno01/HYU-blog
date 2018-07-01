module.exports = async function(req, res, next) {
  //is admin or ballot's owner
  sails.log.debug(req.session.allotin);
  sails.log.debug(req.param('id'));
  let currentUser = await User.findOne({ id: req.session.allotin })
  .intercept(err => {
    sails.log.error('Cannot find user');
    sails.log.error(err);
    return err;
  });

  let ballot = await Ballot.findOne({ id: req.param('id') })
  .intercept(err => {
      sails.log.error('Cannot find ballot');
      sails.log.error(err);
      return err;
  });
  
  if(!ballot) {
    return res.notFound('No such ballot');
  }

  if(req.session.allotin == ballot.owner || currentUser.isAdmin) return next();
  else res.forbidden('Require admin or owner');
}