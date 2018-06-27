const C = require('Convention');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete photo.',


  inputs: {
    id: {
      description: 'Photo\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    await Photo.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory photo.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
