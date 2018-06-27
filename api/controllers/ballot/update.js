const C = require('Convention');


module.exports = {


  friendlyName: 'Update',


  description: 'Update ballot.',


  inputs: {
    id: {
      description: 'Ballot\'s id.',
      type: 'number',
      required: true
    },

    title: {
      description: 'Update title.',
      type: 'string',
      required: false
    },

    text: {
      description: 'Update text.',
      type: 'string',
      required: false
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    if(!inputs.title && !inputs.text) {
      exits.failed('No update infomation.');
    }

    let rec = { ...(inputs.title ? { title: inputs.title } : {} ), ...(inputs.text ? { text: inputs.text } : {}) };

    await Ballot.update({ id: inputs.id }).set(rec)
    .intercept(err => {
      sails.log.error('Cannot update ballot.');
      sails.log.error(err);
      return err;
    });
   
    exits.success();
  }


};