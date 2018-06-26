const C = require('Convention');


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
      description: 'Option\'s title.',
      type: 'string',
      required: true
    }

  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    if(inputs.title){
      await Option.update({ id : inputs.id })
      .set({ title : inputs.title })
      .intercept(err => {
        sails.log.error('Cannot update option.');
        sails.log.error(err);
        return err;
      });
    }
   
    exits.success();
  }


};
