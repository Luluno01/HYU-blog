const C = require('Convention.js');
const M = require('Convention.js').MSG.USER;


module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    if(this.req.session.login) sails.log.info(`User (${this.req.session.login}) logged out`);
    delete this.req.session.login;
    delete this.req.session.isBlogger;
    delete this.req.session.reset;
    delete this.req.session.salt;
    return exits.success(M.LOGGED_OUT);

  }


};
