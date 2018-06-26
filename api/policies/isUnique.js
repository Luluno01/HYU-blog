module.exports = async function(req, res, next) {
  //ballotrecord must be unique
  let ballotrecord = await Ballotrecord.findOne({ ballot: req.param('ballot'), option: req.param('option') })
  .intercept(err => {
    sails.log.error('Cannot find ballot');
    sails.log.error(err);
    return err;
  });
  if(ballotrecord) res.forbidden('One user can only vote once');
  else return next();
}