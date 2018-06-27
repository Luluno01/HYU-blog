const C = require('Convention');

module.exports = {


  friendlyName: 'Uplaod',


  description: 'Upload photo.',


  files: ['photo'],


  inputs: {

    album: {
      description: 'Album\'s id.',
      type: 'number',
      required: true
    },

    owner: {
      description: 'Owner\'s id.',
      type: 'number',
      required: true
    },

    photo: {
      example: '===',
      required: true
    }

  },

  exits: C.EXITS.DEFAULT,

  fn: function (inputs, exits) {

    inputs.photo.upload({
      // don't allow the total upload size to exceed ~4MB
      maxBytes: 4000000,
      dirname: require('path').resolve(sails.config.appPath, 'images')
    }, function(err, uploadedFiles) {
      if (err) return exits.error(err);

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        return exits.failed('No file was uploaded');
      }

      Photo.create({ path: uploadedFiles[0].fd, owner: inputs.owner, album: inputs.album })
      .intercept(err => {
        sails.log.error('Cannot creat Photo.');
        sails.log.error(err);
        return err;
      })
      .then(() => {
        exits.success();
      });
    });
  }
};
  