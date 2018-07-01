const C = require('Convention');


module.exports = {


  friendlyName: 'Create',


  description: 'Create ballot.',


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
    published: {
      description: 'Create published.',
      type: 'boolean',
      required: true
    },
    owner: {
      description: 'Create owner.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    let ballot = await Ballot.create({title: inputs.title, text: inputs.text, pubilshed: inputs.pubilshed, owner: inputs.owner}).fetch
    .intercept(err => {
      sails.log.error('Cannot create ballot.');
      sails.log.error(err);
      return err;
    });
    exits.success(ballot.id);
  }


};
