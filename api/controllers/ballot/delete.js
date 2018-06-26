const C = require('Convention.js');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete ballot.',


  inputs: {
    id: {
      description: 'Ballot\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    await Ballot.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory ballot.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
