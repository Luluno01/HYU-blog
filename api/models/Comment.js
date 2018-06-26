module.exports = {
  schema: true,
  attributes: {
    text: {
      type: 'string',
      required: true
    },

    blog: {
      model: 'blog',
      required: true
    },

    comment: {
      model: 'comment'
    },

    owner: {
      model: 'user',  // Foreign key
      required: true
    }
  }
};