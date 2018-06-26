module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    ballot: {
      model: 'ballot',
      required: true
    },
    votes: {
      type: 'number',
      defaultsTo: 0
    },
    owner: {
      model: 'user'
    }
    
  }
}