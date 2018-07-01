const WordTable = require('word-table');

module.exports = {
  schema: true,
  attributes: {
    text: {
      type: 'string',
      required: true
    },

    blog: {
      model: 'blog',
      required: true
    },

    comment: {
      model: 'comment'
    },

    owner: {
      model: 'user',  // Foreign key
      required: true
    }
  },

  async listComment(criteria) {
    let comments = await Comment.find(criteria)
    .intercept(err => {
      sails.log.error('Cannot list comment.');
      sails.log.error(err);
      return err;
    });
    let header = ['id', 'text', 'blog', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let comment of comments) {
      wt.appendBody([comment.id, comment.text, comment.blog, comment.owner]);
    }
    sails.log.info('\n' + wt.string());
  },

  async deleteComment(criteria) {
    await Comment.destroy(criteria)
    .intercept(err => {
      sails.log.error('Cannot list comment.');
      sails.log.error(err);
      return err;
    });

    let comments = await Comment.find()
    let header = ['id', 'text', 'blog', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let comment of comments) {
      wt.appendBody([comment.id, comment.text, comment.blog, comment.owner]);
    }
    sails.log.info('\n' + wt.string());
  }
};