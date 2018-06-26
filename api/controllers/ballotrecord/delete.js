const C = require('Convention.js');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete ballotrecord.',


  inputs: {
    id: {
      description: 'Ballotrecord\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  // Warning: Session leak
  fn: async function (inputs, exits) {

    await Ballotrecord.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory ballotrecord.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
