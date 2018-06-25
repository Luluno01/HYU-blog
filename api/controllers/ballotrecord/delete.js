const C = require('Convention.js');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete option.',


  inputs: {
    id: {
      description: 'Option\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  // Warning: Session leak
  fn: async function (inputs, exits) {

    await Option.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory option.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
