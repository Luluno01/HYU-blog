module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'user'  // Foreign key
    }
  }
};