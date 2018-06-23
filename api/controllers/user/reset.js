const C = require('Convention.js');
const M = require('Convention.js').MSG.USER;


module.exports = {


  friendlyName: 'Reset',


  description: 'Reset password.',


  inputs: {
    oldPassword: {
      description: 'Old salted password.',
      type: 'string',
      required: false
    },
    newPassword: {
      description: 'New salted password.',
      type: 'string',
      required: false
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {
    /*
    Get static salt
    Get dynamic salt
    Validate old password
    Get new static salt
    Set new salted password
    */
    let session = this.req.session;
    let ret = await (async function() {
      if(!session.login) return exits.failed(M.REQUIRE_LOGIN);
      if(inputs.oldPassword && inputs.newPassword) return exits.failed(M.INVALID_STATE);
      if(!inputs.oldPassword && !inputs.newPassword) {
        // Get static salt
        if(inputs.oldPassword) return exits.failed(M.INVALID_STATE);
        let user = await User.findOne({
          id: session.login
        }).intercept(err => {
          sails.log.error('Cannot find user.');
          sails.log.error(err);
          return err;
        });
        if(!user) {
          sails.log.error('No such logged-in user');
          delete session.login;
          return exits.failed(M.INVALID_STATE);
        }
        return exits.success(user.salt);
      }
      if(inputs.oldPassword) {
        // Validate old password
        if(!session.salt) return exits.failed(M.INVALID_STATE);
        let user = await User.findOne({
          id: session.login
        }).intercept(err => {
          delete session.reset;
          sails.log.error('Cannot find user.');
          sails.log.error(err);
          return err;
        });
        if(!user) {
          // User not found
          sails.log.error('No such logged-in user');
          delete session.login;
          delete session.reset;
          return exits.failed(M.INVALID_STATE);
        }
        // User found
        try {
          if(await User.validate(user, session.salt, inputs.oldPassword)) {
            session.reset = true;
            return exits.success(M.LOGGED_IN);
          } else {
            delete session.reset;
            return exits.failed(M.USERNAME_OR_PASSWORD_INCORRECT);
          }
        } catch {
          delete session.reset;
          return exits.failed(M.USERNAME_OR_PASSWORD_INCORRECT);
        }
      }
      if(inputs.newPassword && inputs.newPassword.length == 128) {
        if(!session.reset || !session.salt) return exits.failed(M.INVALID_STATE);
        // Set new password
        let user = await User.findOne({
          id: session.login
        }).intercept(err => {
          delete session.reset;
          sails.log.error('Cannot find user.');
          sails.log.error(err);
          return err;
        });
        if(!user) {
          // User not found
          sails.log.error('No such logged-in user');
          delete session.login;
          delete session.reset;
          return exits.failed(M.INVALID_STATE);
        }
        delete session.reset;
        delete session.login;  // Logout the user
        await User.update({
          id: user.id
        }, {
          salt: session.salt,
          password: inputs.newPassword
        }).intercept(err => {
          sails.log.error('Cannot update user');
          sails.log.error(err);
          return err;
        });
        return exits.success(M.NEW_PASSWORD_SET);
      }
      
      return exits.failed(M.INVALID_STATE);
    })();
    delete session.salt;
    return ret;

  }


};
