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
    owner: {
      model: 'user'  // Foreign key
    }
  }
};