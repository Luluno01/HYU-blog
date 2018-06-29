const C = require('Convention');


module.exports = {


  friendlyName: 'Create',


  description: 'Create ballot record.',


  inputs: {
    ballot: {
      description: 'Create ballot.',
      type: 'number',
      required: true
    },
    option: {
      description: 'Create option.',
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

    await Ballotrecord.create({ballot: inputs.ballot, option: inputs.option, owner: inputs.owner})
    .intercept(err => {
      sails.log.error('Cannot create ballot record.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
