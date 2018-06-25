module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    },
    published: {
      type: 'boolean',
      defaultsTo: true
    },
    owner: {
      model: 'user'  // Foreign key
    }
  },

  /**
   * @author Zezhong Xu
   * @description Search with pagenation. 
   * @param {number} pageNum Page number.
   * @param {Object} criteria 
   */
  async getPage(pageNum, criteria) {
    return await Blog.find({
      ...(criteria || {}),
      skip: pageNum * 10,
      limit: 10
    }).intercept(err => {
      sails.log.error('Cannot find blogs.');
      sails.log.error(err);
      return err;
    });
  },

  /**
   * @author Zezhong Xu
   * @description Get the number of someone's blogs.
   * @param {User} user 
   * @returns {number} The number of blogs belongs to the user.
   */
  async getCount(user) {
    return await Blog.count(user && {
      owner: user.id
    }).intercept(err => {
      sails.log.error('Cannot get the count of blogs.');
      sails.log.error(err);
      return err;
    });
  }
};