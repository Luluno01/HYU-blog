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

  async listBallot(criteria) {
    let ballot = await Ballot.findone(criteria)
    .intercept(err => {
      sails.log.error('Cannot list ballot.');
      sails.log.error(err);
      return err;
    });

    let option = await Option.find({ballot: ballot.id})
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
    sails.log.info('\n' + ballot.title + wt.string());
  },
}