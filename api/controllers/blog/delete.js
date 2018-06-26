const C = require('Convention');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete blog.',


  inputs: {
    id: {
      description: 'Blog\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    await Blog.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory blog.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
