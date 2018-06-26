module.exports = async function(req, res, next) {
  //The photo that want to be deleted must be related to it's album.
    
  let ballot = await Ballot.findOne({ id: req.param('ballot') })
  .intercept(err => {
    sails.log.error('Cannot find ballot');
    sails.log.error(err);
    return err;
  });
  if(!ballot) res.forbidden('No such ballot');

  let option = await Option.findOne({ id: req.param('option') })
  .intercept(err => {
    sails.log.error('Cannot find option');
    sails.log.error(err);
    return err;
  });
  if(!option) res.forbidden('No such option');

  if(option.ballot != ballot.id) res.forbidden('Option does not match this ballot');
  else return next();

}