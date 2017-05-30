/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const User = require ('../resource/user/user.model');
const Comment = require ('../resource/comment/comment.model').model;
const async = require('async');

