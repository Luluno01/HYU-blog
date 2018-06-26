module.exports = async function(req, res, next) {
  //Option must be related to an existed ballot.
  let ballot = await Ballot.findOne({ id: req.param('ballot') })
  .intercept(err => {
    sails.log.error('Cannot find ballot');
    sails.log.error(err);
    return err;
  });
  if(!ballot.id) res.forbidden('No such ballot');
  else return next();
}