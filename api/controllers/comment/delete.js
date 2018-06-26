const C = require('Convention');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete comment.',


  inputs: {
    id: {
      description: 'Comment\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    await Comment.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory comment.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
