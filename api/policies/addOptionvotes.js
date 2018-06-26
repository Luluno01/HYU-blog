module.exports = async function(req, res, next) {
  //Option.votes++ when ballotrecord is created
  let option = await Option.findOne({ id: req.param('option') })
  await Option.update({ id: req.param('option') }).set({ votes: option.votes + 1 })
  .intercept(err => {
    sails.log.error('Cannot find option');
    sails.log.error(err);
    return err;
  });
  
  return next();
}