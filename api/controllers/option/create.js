const C = require('Convention');


module.exports = {


  friendlyName: 'Create',


  description: 'Create option.',


  inputs: {
    title: {
      description: 'Create title.',
      type: 'string',
      required: true
    },
    ballot: {
      description: 'Create ballot.',
      type: 'number',
      required: true
    },
    owner: {
      description: 'Create owner.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    await Ballotrecord.create({title: inputs.title, ballot: inputs.ballot, owner: inputs.owner})
    .intercept(err => {
      sails.log.error('Cannot create option.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
