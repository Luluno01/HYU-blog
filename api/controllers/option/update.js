const C = require('Convention.js');


module.exports = {


  friendlyName: 'Update',


  description: 'Update option.',


  inputs: {
    id: {
      description: 'Option\'s id.',
      type: 'number',
      required: true
    },

    title: {
      description: 'Update title.',
      type: 'string',
      required: false
    }

  },


  exits: C.EXITS.DEFAULT,


  // Warning: Session leak
  fn: async function (inputs, exits) {
    if(!inputs.title){
      exits.failed('No update infomation.');
    }

    if(inputs.title){
      await Option.update({ id : inputs.id })
      .set({ title : inputs.title })
      .intercept(err => {
        sails.log.error('Cannot update option\'s title.');
        sails.log.error(err);
        return err;
      });
    }
   
    exits.success();
  }


};
