'use strict';

const jwt = require ( 'jsonwebtoken');

const User = require ( './user.model');
const config = require ( '../../config/environment');
const Controller = {};

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
}



/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {
    return User.find({}, '-salt -password').exec(function (err, users) {
        res.status(200).json(users);
    })

};



/**
 * Creates a new user
 */
 Controller.signup = function (req, res) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function (err, user) {
        if(err){

        }
        else{
            req.login(user, function(err) {
              if (err) {
                return res.status(500).json(error);
            } else {
        // var token = signToken(user._id, user.role);
        // return res.json({token : token });
        if(user.role == "admin"){
         res.redirect('/admin/passages');
     }
     else{
         res.redirect('/passages');
     }
 }
});
        }
        
    })
};



Controller.getSignupView = function (req, res) {
 res.render('user/signup');
};


Controller.getSigninView = function (req, res) {
 res.render('user/signin');
};


/**
 * Get a single user
 */
 Controller.show = function (req, res, next) {
    var userId = req.params.id;

    return User.findById(userId).exec(function (err, user) {
        if (!user) {
            return res.status(404).end();
        }
        else{
            res.json(user.profile);
        }

    })
};



/**
 * Deletes a user
 * restriction: 'admin'
 */
 Controller.destroy = function (req, res) {
    return User.findByIdAndRemove(req.params.id)
    .exec(function () {
        res.status(204).end();
    })

};



/**
 * Change a users password
 */
 Controller.changePassword = function (req, res) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.findById(userId).exec(function (user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            return user.save(function (err) {
                if(err){

                }
                else{
                    res.status(204).end();
                }

            })
        } else {
            return res.status(403).end();
        }
    })
};



/**
 * Get my info
 */
 Controller.me = function (req, res, next) {

    return res.json(req.user);
    // var userId = req.user._id;

    // return User.findOne({_id: userId}, '-salt -password').exec()
    //     .then(function (user) { // don't ever give out the password or salt
    //         if (!user) {
    //             return res.status(401).end();
    //         }
    //         return res.json(user);
    //     })
    //     .catch(function (err) {
    //         next(err)
    //     });
};



/**
 * Authentication callback
 */
 Controller.authCallback = function (req, res) {
    res.redirect('/');
}

module.exports = Controller;
