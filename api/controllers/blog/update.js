const C = require('Convention.js');


module.exports = {


  friendlyName: 'Update',


  description: 'Update blog.',


  inputs: {
    id: {
      description: 'Blog\'s id.',
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


  // Warning: Session leak
  fn: async function (inputs, exits) {
    if(!inputs.title && !inputs.text){
      exits.failed('No update infomation.');
    }

    if(inputs.title){
      await Blog.update({ id : inputs.id })
      .set({ title : inputs.title })
      .intercept(err => {
        sails.log.error('Cannot update blog\'s title.');
        sails.log.error(err);
        return err;
      });
    }

    
    if(inputs.text){
      await Blog.update({ id : inputs.id })
      .set({ title : inputs.text })
      .intercept(err => {
        sails.log.error('Cannot update blog\'s text.');
        sails.log.error(err);
        return err;
      });
    }
   
    exits.success();
  }


};
