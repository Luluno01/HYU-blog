module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    ballot: {
      model: 'ballot'
    },
    votes: {
      type: 'number',
      required: true,
      defaultsTo: 0
    }
    
  }
}