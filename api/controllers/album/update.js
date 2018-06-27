const C = require('Convention');


module.exports = {


  friendlyName: 'Update',


  description: 'Update album.',


  inputs: {
    id: {
      description: 'Album\'s id.',
      type: 'number',
      required: true
    },

    title: {
      description: 'Update title.',
      type: 'string',
      required: false
    },

    description: {
      description: 'Update description.',
      type: 'string',
      required: false
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    if(!inputs.title && !inputs.description) {
      exits.failed('No update infomation.');
    }

    let rec = { ...(inputs.title ? { title: inputs.title } : {} ), ...(inputs.description ? { description: inputs.description } : {}) };

    await Album.update({ id: inputs.id }).set(rec)
    .intercept(err => {
      sails.log.error('Cannot update album.');
      sails.log.error(err);
      return err;
    });
   
    exits.success();
  }

};
