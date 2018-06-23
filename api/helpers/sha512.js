const crypto = require('crypto');
const C = require('Convention.js');


module.exports = {


  friendlyName: 'sha512',


  description: 'sha512',


  inputs: {
    str: {
      description: 'String to hash.',
      type: 'string',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    let hash = crypto.createHash('sha512');
    hash.update(inputs.str);
    return exits.success(hash.digest('hex'));

  }


};

