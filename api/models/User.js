const WordTable = require('word-table');
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
  },

  /**
   * @author Zezhong Xu
   * @description List user. 
   */
  async listUser(criteria) {
    let users = await User.find(criteria)
    .intercept(err => {
      sails.log.error('Cannot list users.');
      sails.log.error(err);
      return err;
    });
    let header = ['id', 'username', 'nickname', 'isBlogger', 'isAdmin'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let user of users) {
      wt.appendBody([user.id, user.username, user.nickname, user.isBlogger, user.isAdmin]);
    }
    sails.log.info('\n' + wt.string());
  },

  async setBlogger(criteria) {
    let users = await User.update(criteria).set({ isBlogger: true }).fetch()
    .intercept(err => {
      sails.log.error('Cannot update users.');
      sails.log.error(err);
      return err;
    });

    let header = ['id', 'username', 'nickname', 'isBlogger', 'isAdmin'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let user of users) {
      wt.appendBody([user.id, user.username, user.nickname, user.isBlogger, user.isAdmin]);
    }
    sails.log.info('\n' + wt.string());
  },

  async setNotBlogger(criteria) {
    let users = await User.update(criteria).set({ isBlogger: false }).fetch()
    .intercept(err => {
      sails.log.error('Cannot update users.');
      sails.log.error(err);
      return err;
    });

    let header = ['id', 'username', 'nickname', 'isBlogger', 'isAdmin'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let user of users) {
      wt.appendBody([user.id, user.username, user.nickname, user.isBlogger, user.isAdmin]);
    }
    sails.log.info('\n' + wt.string());
  },

  async setAdmin(criteria) {
    let users = await User.update(criteria).set({ isAdmin: true }).fetch()
    .intercept(err => {
      sails.log.error('Cannot update users.');
      sails.log.error(err);
      return err;
    });

    let header = ['id', 'username', 'nickname', 'isBlogger', 'isAdmin'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let user of users) {
      wt.appendBody([user.id, user.username, user.nickname, user.isBlogger, user.isAdmin]);
    }
    sails.log.info('\n' + wt.string());
  },

  async setNotAdmin(criteria) {
    let users = await User.update(criteria).set({ isAdmin: false }).fetch()
    .intercept(err => {
      sails.log.error('Cannot update users.');
      sails.log.error(err);
      return err;
    });

    let header = ['id', 'username', 'nickname', 'isBlogger', 'isAdmin'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let user of users) {
      wt.appendBody([user.id, user.username, user.nickname, user.isBlogger, user.isAdmin]);
    }
    sails.log.info('\n' + wt.string());
  },

  async deleteUser(criteria) {
    await User.destroy(criteria)
    .intercept(err => {
      sails.log.error('Cannot delete user.');
      sails.log.error(err);
      return err;
    });
    let users = await User.find()
    .intercept(err => {
      sails.log.error('Cannot list users.');
      sails.log.error(err);
      return err;
    });
    let header = ['id', 'username', 'nickname', 'isBlogger', 'isAdmin'];
    let body = [];
    let wt = new WordTable(header, body);
    for(let user of users) {
      wt.appendBody([user.id, user.username, user.nickname, user.isBlogger, user.isAdmin]);
    }
    sails.log.info('\n' + wt.string());
  }
};