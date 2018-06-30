const C = require('Convention');


module.exports = {


  friendlyName: 'Count',


  description: 'Count blog.',


  inputs: {
    id: {
      description: 'User\'s id.',
      type: 'number',
      required: false
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    let count = await Blog.count({ owner: inputs.id })
    .intercept(err => {
      sails.log.error('Cannot count blog.');
      sails.log.error(err);
      return err;
    });
    exits.success(count);
  }


};
