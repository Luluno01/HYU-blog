module.exports = {
  schema: true,
  attributes: {

    path: {
      type: 'string',
      required: true
    },
    
    owner: {
      model: 'user',
      required: true // Foreign key
    },

    album: {
      model: 'album',
      required: true // Foreign key
    }
  }
};