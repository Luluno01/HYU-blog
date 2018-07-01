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
    owner: {
      model: 'user'  // Foreign key
    }
  },

  async listNotice(criteria) {
    let notices = await Notice.find(criteria)
    .intercept(err => {
      sails.log.error('Cannot list notice.');
      sails.log.error(err);
      return err;
    });
    let header = ['id', 'title', 'text', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let notice of notices) {
      wt.appendBody([notice.id, notice.title, notice.text, notice.owner]);
    }
    sails.log.info('\n' + wt.string());
  },

  async deleteNotice(criteria) {
    await Notice.destroy(criteria)
    .intercept(err => {
      sails.log.error('Cannot delete notice.');
      sails.log.error(err);
      return err;
    });

    let notices = await Notice.find()
    let header = ['id', 'text', 'blog', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let notice of notices) {
      wt.appendBody([notice.id, notice.title, notice.text, notice.owner]);
    }
    sails.log.info('\n' + wt.string());
  }
};