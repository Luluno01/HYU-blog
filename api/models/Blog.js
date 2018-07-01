const WordTable = require('word-table');

module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    },
    published: {
      type: 'boolean',
      defaultsTo: true
    },
    owner: {
      model: 'user'  // Foreign key
    }
  },

  /**
   * @author Zezhong Xu
   * @description Search with pagenation. 
   * @param {number} pageNum Page number.
   * @param {Object} criteria 
   */
  async getPage(pageNum, criteria) {
    return await Blog.find({
      ...(criteria || {}),
      skip: pageNum * 10,
      limit: 10
    }).intercept(err => {
      sails.log.error('Cannot find blogs.');
      sails.log.error(err);
      return err;
    });
  },

  /**
   * @author Zezhong Xu
   * @description Get the number of someone's blogs.
   * @param {User} user 
   * @returns {number} The number of blogs belongs to the user.
   */
  async getCount(user) {
    return await Blog.count(user && {
      owner: user.id
    }).intercept(err => {
      sails.log.error('Cannot get the count of blogs.');
      sails.log.error(err);
      return err;
    });
  },

  async listBlog(criteria) {
    let blogs = await Blog.find(criteria)
    .intercept(err => {
      sails.log.error('Cannot list blog.');
      sails.log.error(err);
      return err;
    });
    let header = ['id', 'title', 'text', 'published', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let blog of blogs) {
      wt.appendBody([blog.id, blog.title, blog.text, blog.published, blog.owner]);
    }
    sails.log.info('\n' + wt.string());
  },

  async deleteBlog(criteria) {
    let blogComment = await Comment.find({blog: criteria.id});
    let i = 0;
    for(i = 0; i < blogComment.length; i++){
      await Comment.destroy({id: blogComment[i].id})
      .intercept(err => {
        sails.log.error('Cannot destory blog Comment.');
        sails.log.error(err);
        return err;
      });
    }
    
    await Blog.destroy(criteria)
    .intercept(err => {
      sails.log.error('Cannot list blog.');
      sails.log.error(err);
      return err;
    });
    let blogs = await Blog.find()
    let header = ['id', 'title', 'text', 'published', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let blog of blogs) {
      wt.appendBody([blog.id, blog.title, blog.text, blog.published, blog.owner]);
    }
    sails.log.info('\n' + wt.string());
  },

  async listDetailBlog(criteria) {
    let blog = await Blog.findOne(criteria)
    .intercept(err => {
      sails.log.error('Cannot list blog.');
      sails.log.error(err);
      return err;
    });

    let comments = await Comment.find({blog: blog.id})
    .intercept(err => {
      sails.log.error('Cannot list comment.');
      sails.log.error(err);
      return err;
    });

    let header = ['text', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let comment of comments) {
      wt.appendBody([comment.text, comment.owner]);
    }
    sails.log.info('\n' + blog.title + '\n' + wt.string());
  },
};