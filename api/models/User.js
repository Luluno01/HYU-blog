const assert = require('assert');


module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    nickname: {
      type: 'string',
      unique: false,
      required: true
    },
    /* Static salt, hash(staticSalt, password) */
    salt: {
      type: 'string'
    },
    password: {
      type: 'string'
    },

    isBlogger: {
      type: 'boolean',
      defaultsTo: false
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  /**
   * @description Validate the password of `user` with `dynamicSalt` and `password`.
   * @param {{ username: string; salt: string; password: string; isBlogger: boolean }} user An instance of `User`.
   * @param {string} dynamicSalt Dynamic salt.
   * @param {string} password Salted password (sha512(dynamicSalt, sha512(staticSalt, password))). Received from client.
   * @returns {boolean} Password matched or not.
   */
  validate: async (user, dynamicSalt, password) => {
    assert(user && user.salt && user.password, 'No password');
    assert(typeof password == 'string');

    // sails.log.debug(user.id, dynamicSalt, password);
    return await sails.helpers.sha512(dynamicSalt + user.password) == password.toString();
  },

  customToJSON: function(keyName) {
    // Return a shallow copy of this record with the password, username and salt removed.
    return _.omit(this, ['password', 'username', 'salt']);
  }
};