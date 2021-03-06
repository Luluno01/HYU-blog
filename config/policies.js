/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UserController: {
    //Require requests to come from a logged-in Blog Owner user
    'logout': 'isLoggedIn',

    //Require requests to come from a logged-in Blog Owner user or admin
    'reset': 'isLoggedIn',

    'find': false,

    'create': false,

    'delete':  ['isLoggedIn', 'isAdmin']
  },

  BlogController: {
    //Require requests to come from a logged-in Blog Owner user
    'create': ['isLoggedIn', 'isBlogger', 'isOwner'],

    //Require requests to come from a logged-in Blog Owner user or admin
    'delete': ['isLoggedIn', 'authority'],
    
    //Require requests to come from a logged-in Blog Owner user or admin
    'update': ['isLoggedIn', 'authority']
  },

  NoticeController: {
    //Require requests to come from a logged-in admin user
    'create': ['isLoggedIn', 'isAdmin', 'isOwner'],

    //Require requests to come from a logged-in admin user
    'delete': ['isLoggedIn', 'isAdmin'],
    
    //Require requests to come from a logged-in admin user
    'update': ['isLoggedIn', 'isAdmin']
  },

  AlbumController: {
    //Require requests to come from a logged-in Album Owner user
    'create': ['isLoggedIn', 'isBlogger', 'isOwner'],

    //Require requests to come from a logged-in Album Owner user or admin
    'delete': ['isLoggedIn', 'authorityUpdateAlbum'],
    
    //Require requests to come from a logged-in Album Owner user or admin
    'update': ['isLoggedIn', 'authorityUpdateAlbum']
  },

  PhotoController: {
    //Require requests to come from a logged-in Photo Owner user
    'upload': ['isLoggedIn', 'isOwner', 'isRightAlbum'],

    //Require requests to come from a logged-in Photo Owner user or admin
    'delete': ['isLoggedIn', 'authorityDeletePhoto'],
    
  },

  BallotController: {
    //Require requests to come from a logged-in Ballot Owner user
    'create': ['isLoggedIn', 'isBlogger', 'isOwner'],

    //Require requests to come from a logged-in Ballot Owner user or admin
    'delete': ['isLoggedIn', 'authorityDeleteBallot'],
    
    //Require requests to come from a logged-in Ballot Owner user or admin
    'update': ['isLoggedIn']
  },

  OptionController: {
    //Require requests to come from a logged-in Option Owner user
    'create': ['isLoggedIn', 'isBlogger', 'isOwner', 'haveBallot'],

    //Require requests to come from a logged-in Option Owner user or admin
    'delete': ['isLoggedIn', 'authority'],
    
    //Require requests to come from a logged-in Option Owner user or admin
    'update': ['isLoggedIn', 'authority']
  },

  BallotrecordController: {
    //Require requests to come from a logged-in Ballotrecord Owner user
    'create': ['isLoggedIn', 'isOwner', 'isBelongingtoballot', 'isUnique', 'addOptionvotes'],

    //Require requests to come from a logged-in Ballotrecord Owner user or admin
    'delete': ['isLoggedIn', 'isAdmin', 'subOptionvotes'],
    
  },

  CommentController: {
    //Require requests to come from a logged-in user
    'create': ['isLoggedIn', 'isOwner', 'haveBlog', 'haveComment', 'isBelongingtoblog'],

    //Require requests to come from a logged-in  comment or Blog Owner or admin
    'delete': ['isLoggedIn', 'authorityDeleteComment'],
    
  }
};
