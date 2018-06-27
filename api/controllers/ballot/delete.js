const C = require('Convention.js');


module.exports = {


  friendlyName: 'Delete',


  description: 'Delete ballot.',


  inputs: {
    id: {
      description: 'Ballot\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    let ballotOption = await Option.find({ ballot: inputs.id });

    let i = 0;
    for(i = 0; i < ballotOption.length; i++){

      await Option.destroy(ballotOption[i].id)
      .intercept(err => {
        sails.log.error('Cannot destory option.');
        sails.log.error(err);
        return err;
      });
    }

    let ballotrecord = await ballotrecord.find({ ballot: inputs.id });

    let i = 0;
    for(i = 0; i < ballotrecord.length; i++){

      await Option.destroy(ballotrecord[i].id)
      .intercept(err => {
        sails.log.error('Cannot destory ballotrecord.');
        sails.log.error(err);
        return err;
      });
    }

    await Ballot.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory ballot.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }


};
