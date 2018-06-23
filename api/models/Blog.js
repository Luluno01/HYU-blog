module.exports = {
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
  }
};