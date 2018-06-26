module.exports = async function(req, res, next) {
  
  if(req.param('comment')){
    
    let blog = await Blog.findOne({ id: req.param('blog') })
    .intercept(err => {
      sails.log.error('Cannot find blog');
      sails.log.error(err);
      return err;
  });

  let comment = await Comment.findOne({ id: req.param('comment') })
  .intercept(err => {
    sails.log.error('Cannot find comment');
    sails.log.error(err);
    return err;
  });
  if(!comment) res.forbidden('No such comment');
  if(comment.blog != blog.id) res.forbidden('Comment does not match this blog');
  else return next();


  }
  else return next();
}