module.exports = async function(req, res, next) {
    let currentUser = await User.findOne({ id: req.session.login })
    .intercept(err => {
      sails.log.error('Cannot find user');
      sails.log.error(err);
      return err;
    });
  
    let comment = await Comment.findOne({ id: req.param('id') })
    .intercept(err => {
        sails.log.error('Cannot find comment');
        sails.log.error(err);
        return err;
    });
    
    
    let blog = await Blog.findOne({ id: comment.blog.id })
    .intercept(err => {
        sails.log.error('Cannot find blog');
        sails.log.error(err);
        return err;
    });

    if(!blog) {
      return res.notFound('No such blog');
    }
  
    if(req.session.login == comment.owner || currentUser.isAdmin || blog.owner) return next();
    else res.forbidden('Require admin or owner');
  }