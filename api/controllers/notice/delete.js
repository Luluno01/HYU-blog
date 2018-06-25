const C = require('Convention.js');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete notice.',


  inputs: {
    id: {
      description: 'Notice\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  // Warning: Session leak
  fn: async function (inputs, exits) {

    await Notice.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory notice.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }
};
