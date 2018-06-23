const C = require('Convention.js');
const VisibleChar = require('unlib.js/Constants.js').VISIBLE_ASCII_CHAR;
const R = require('unlib.js/Random.js');


module.exports = {


  friendlyName: 'Salt',


  description: 'Salt user.',


  inputs: {

  },


  exits: C.EXITS.DEFAULT,


  // Warning: Session leak
  fn: async function (inputs, exits) {

    return exits.success(this.req.session.salt = R.randStr(VisibleChar, 8));  // Could be either static salt or dynamic salt

  }


};
