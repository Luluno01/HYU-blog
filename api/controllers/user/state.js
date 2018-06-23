const C = require('Convention.js');
const M = require('Convention.js').MSG.USER;


module.exports = {


  friendlyName: 'State',


  description: 'Login state.',


  inputs: {

  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    return exits.success(this.req.session.login ? '1' : '0');

  }


};
