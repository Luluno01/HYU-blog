const C = require('Convention');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete blog.',


  inputs: {
    id: {
      description: 'Blog\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    let blogComment = await Comment.find({ blog: inputs.id });
    let i = 0;
    for(i = 0; i < blogComment.length; i++){
      await Comment.destroy({id: blogComment[i].id})
      .intercept(err => {
        sails.log.error('Cannot destory blog Comment.');
        sails.log.error(err);
        return err;
      });
    }
    
    await Blog.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory blog.');
      sails.log.error(err);
      return err;
    });
    exits.success();

  }


};
