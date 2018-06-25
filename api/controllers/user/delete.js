const C = require('Convention.js');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    id: {
      description: 'User\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  // Warning: Session leak
  fn: async function (inputs, exits) {

    await User.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory user.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
