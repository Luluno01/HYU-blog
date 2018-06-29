const C = require('Convention.js');
const M = require('Convention.js').MSG.USER;


module.exports = {


  friendlyName: 'State',


  description: 'Login state.',


  inputs: {

  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    if(!this.req.login) return exits.success({})
    let user = await User.findOne({ id: this.req.login })
    .intercept(err => {
      sails.log.error('Cannot find user')
      sails.log.error(err)
      return err
    })
    return exits.success(user);

  }


};
