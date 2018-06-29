const C = require('Convention');


module.exports = {


  friendlyName: 'Create',


  description: 'Create album.',


  inputs: {
    title: {
      description: 'Create description.',
      type: 'string',
      required: false
    },
    description: {
      description: 'Create description.',
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

    await Album.create({title: inputs.title, description: inputs.description, owner: inputs.owner})
    .intercept(err => {
      sails.log.error('Cannot create album.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
