module.exports = async function(req, res, next) {
  //Comment to a comment must be related to an existed comment.
  if(req.param('comment')){
      let comment = await Comment.findOne({ id: req.param('comment') })
      .intercept(err => {
        sails.log.error('Cannot find comment');
        sails.log.error(err);
        return err;
      });
      if(!comment) res.forbidden('No such comment');
      else return next();
  }
  
  else return next();
}