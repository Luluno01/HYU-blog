module.exports = async function(req, res, next) {
  //Comment must be related to an existed blog.
  let blog = await Blog.findOne({ id: req.param('blog') })
  .intercept(err => {
    sails.log.error('Cannot find blog');
    sails.log.error(err);
    return err;
  });
  if(!blog.id) res.forbidden('No such blog');
  else return next();
}