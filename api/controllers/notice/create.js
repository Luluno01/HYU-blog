const C = require('Convention');


module.exports = {


  friendlyName: 'Create',


  description: 'Create notice.',


  inputs: {
    title: {
      description: 'Create title.',
      type: 'string',
      required: false
    },
    text: {
      description: 'Create text.',
      type: 'string',
      required: false
    },
    owner: {
      description: 'Create owner.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    await Notice.create({title: inputs.title, text: inputs.text, owner: inputs.owner})
    .intercept(err => {
      sails.log.error('Cannot create notice.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
