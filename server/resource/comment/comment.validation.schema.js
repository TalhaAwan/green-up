/*jshint esversion: 6 */

const util = require('util');
const Schema = {};

Schema.create = {
    'text': {
     notEmpty: true,
     isLength: {
      options: [{ max: 10000 }],
          errorMessage: 'Must not be greater than 10,000 chars long' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'Invalid text'
  }
};

Schema.id = {
    'id': {
    notEmpty: true,
    matches: {
    	options: [/^[a-f\d]{24}$/i]
    },
    errorMessage: 'Invalid id' 
  }
};


module.exports = Schema;