'use strict';

const path =require( 'path');
module.exports = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: true,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'app-secret'
    },

    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: 'mongodb://localhost/greenUp'
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID || '163996394111235',
        clientSecret: process.env.FACEBOOK_SECRET || '4429f6562b9512f4097de6d2050e18fa',
        callbackURL: process.env.DOMAIN || '/auth/facebook/callback'
    },

    google: {
        clientID: process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL: process.env.DOMAIN || '/auth/google/callback'
    },

    userRoles: ['guest', 'user', 'admin']
};