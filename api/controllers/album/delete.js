const C = require('Convention');
var fs = require('fs');

module.exports = {


  friendlyName: 'Delete',


  description: 'Delete album.',


  inputs: {
    id: {
      description: 'Album\'s id.',
      type: 'number',
      required: true
    }
  },


  exits: C.EXITS.DEFAULT,


  fn: async function (inputs, exits) {

    let albumPhoto = await Photo.find({ album: inputs.id });

    let i = 0;
    for(i = 0; i < albumPhoto.length; i++){

      fs.unlinkSync(albumPhoto[i].path);

      await Photo.destroy(albumPhoto[i].id)
      .intercept(err => {
        sails.log.error('Cannot destory Photo.');
        sails.log.error(err);
        return err;
      });
    }

    await Album.destroy(inputs)
    .intercept(err => {
      sails.log.error('Cannot destory Album.');
      sails.log.error(err);
      return err;
    });
    exits.success();
  }

};
