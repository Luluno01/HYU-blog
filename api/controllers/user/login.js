const C = require('Convention.js');
const M = require('Convention.js').MSG.USER;
const R = require('unlib.js/Random.js');
const VisibleChar = require('unlib.js/Constants.js').VISIBLE_ASCII_CHAR;


module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    username: {
      description: 'User\'s username.',
      type: 'string',
      required: true
    },
    password: {
      description: 'Salted password.',
      type: 'string',
      required: false
    }
  },


  exits: {
    ...C.EXITS.DEFAULT,
    loggedIn : {
      responseType: '',
      status: 409
    }
  },


  fn: async function (inputs, exits) {
    /*
    Get static salt
    Get dynamic salt
    Validate password
    */
    let session = this.req.session;
    let ret = await (async function() {
      if(session.login) return exits.loggedIn(M.ALREADY_LOGGED_IN);
      if(!inputs.password) {
        // Get static salt
        if(inputs.passowrd) return exits.failed(M.INVALID_STATE);
        let user = await User.findOne({
          username: inputs.username,
        }).intercept(err => {
          sails.log.error('Cannot find user.');
          sails.log.error(err);
          return err;
        });
        if(!user) return exits.success(R.randStr(VisibleChar, 8));  // Send fake static salt
        return exits.success(user.salt);
      }
      if(!session.salt) return exits.failed(M.INVALID_STATE);
      let user = await User.findOne({
        username: inputs.username
      }).intercept(err => {
        sails.log.error('Cannot find user');
        sails.log.error(err);
        return err;
      });
      if(!user) return exits.failed(M.USERNAME_OR_PASSWORD_INCORRECT);
      try {
        let res = await User.validate(user, session.salt, inputs.password);
        if(res) {
          session.login = user.id;
          session.isBlogger = user.isBlogger;
          sails.log.info(`User ${user.username} logged in`);
          return exits.success({ ...M.LOGGED_IN, id: user.id });
        } else return exits.failed(M.USERNAME_OR_PASSWORD_INCORRECT);
      } catch {
        return exits.failed(M.USERNAME_OR_PASSWORD_INCORRECT);
      }
    })();
    delete session.salt;
    return ret;
  }


};
