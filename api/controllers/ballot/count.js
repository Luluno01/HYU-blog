const C = require('Convention');


module.exports = {


  friendlyName: 'Count',


  description: 'Count ballot.',


  inputs: {
    id: {
      description: 'User\'s id.',
      type: 'number',
      required: false
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    let count = await Ballot.count({ owner: inputs.id })
    .intercept(err => {
      sails.log.error('Cannot count ballot.');
      sails.log.error(err);
      return err;
    });
    exits.success(count);
  }


};
