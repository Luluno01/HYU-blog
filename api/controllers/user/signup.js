const C = require('Convention.js');
const M = require('Convention.js').MSG.USER;


module.exports = {


  friendlyName: 'Signup',


  description: 'Signup user.',


  inputs: {
    username: {
      description: 'User\'s username.',
      type: 'string',
      required: true
    },
    nickname: {
      description: 'User\'s nickname.',
      type: 'string',
      required: true
    },
    password: {
      description: 'Salted password.',
      type: 'string',
      required: true
    }
  },


  exits: {
    ...C.EXITS.DEFAULT,
    exist: {
      responseType: '',
      status: 409
    }
  },


  fn: async function (inputs, exits) {
    let session = this.req.session;
    let ret = await (async function() {
      if(!session.salt || inputs.password.length != 128) return exits.failed(M.INVALID_STATE);
      let user = await User.findOne({
        username: inputs.username
      }).intercept(err => {
        sails.log.error('Cannot find user.');
        sails.log.error(err);
        return err;
      });
      if(user) return exits.exist(M.USERNAME_EXISTS);

      // Create user
      await User.create({
        username: inputs.username,
        nickname: inputs.nickname,
        salt: session.salt,
        password: inputs.password,
        isBlogger: false
      }).intercept(err => {
        sails.log.error('Cannot create user');
        sails.log.error(err);
        return err;
      });
      return exits.success();
    })();
    delete session.salt;
    return ret;

  }


};
