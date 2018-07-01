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
      model: 'user',  // Foreign key
      required: true
    }
    
  },

  async listDetailBallot(criteria) {
    let ballot = await Ballot.findOne(criteria)
    .intercept(err => {
      sails.log.error('Cannot list ballot.');
      sails.log.error(err);
      return err;
    });

    let options = await Option.find({ballot: ballot.id})
    .intercept(err => {
      sails.log.error('Cannot list option.');
      sails.log.error(err);
      return err;
    });

    let header = ['title', 'votes'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let option of options) {
      wt.appendBody([option.title, option.votes]);
    }
    sails.log.info('\n' + ballot.title + '\n' + wt.string());
  },

  async listBallot(criteria) {
    let ballots = await Ballot.find(criteria)
    .intercept(err => {
      sails.log.error('Cannot list ballot.');
      sails.log.error(err);
      return err;
    });

    let header = ['id','title', 'text', 'published', 'owner'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let ballot of ballots) {
      wt.appendBody([ballot.id, ballot.title, ballot.text, ballot.published, ballot.owner]);
    }
    sails.log.info('\n' + wt.string());
  }
}