module.exports = {


  friendlyName: 'Hello',


  description: 'Hello user.',


  inputs: {
    username: {
      description: 'User\s username.',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      responseType: ''  // Standard response
    }
  },


  fn: async function (inputs, exits) {

    return exits.success(`Hello ${inputs.username}`);
  }


};
