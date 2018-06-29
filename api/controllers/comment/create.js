const C = require('Convention');


module.exports = {


  friendlyName: 'Create',


  description: 'Create blog.',


  inputs: {
    text: {
      description: 'Create text.',
      type: 'string',
      required: true
    },
    blog: {
      description: 'Create blog.',
      type: 'number',
      required: true
    },
    owner: {
      description: 'Create owner.',
      type: 'number',
      required: true
    },
    comment: {
      description: 'Create comment.',
      type: 'string',
      required: false
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    await Comment.create({text: inputs.text, blog: inputs.blog, owner: inputs.owner, comment: inputs.comment})
    .intercept(err => {
      sails.log.error('Cannot create comment.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
