module.exports = {
  schema: true,
  attributes: {
    ballot: {
      model: 'ballot',
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    option: {
      model: 'option',
      required: true
    }
  }
}