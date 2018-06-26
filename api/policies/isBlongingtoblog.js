module.exports = async function(req, res, next) {
  let blog = await Blog.findOne({ id: req.param('blog') })
    .intercept(err => {
      sails.log.error('Cannot find blog');
      sails.log.error(err);
      return err;
  });
  
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

  if(comment.blog.id != blog.id) res.forbidden('Comment does not match this blog');
  else return next();
}