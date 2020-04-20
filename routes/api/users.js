const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');
const passport = require('passport');

// load input validation
const validateCreateUserInput = require('../../validation/createUser');
const validateLoginInput = require('../../validation/login');

// import user model
const User = require('../../models').User;

// get all users
// @route GET: /api/user/
router.get('/', (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users)
        })
});


// create new user
// @route POST: /api/user/createUser
router.post('/createUser', (req, res) => {

    const {
        errors,
        isValid
    } = validateCreateUserInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
            where: {
                phone: req.body.phone
            }
        })
        .then(user => {
            if (user) {
                // errors.phone = 'Phone number already exists';
                return res.status(400).json({
                    message: 'Phone number already exists'
                });
            } else {
                const newUser = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    userType: req.body.userType,
                    password: '$2a$10$ECdOnZkH6ZRE9jzvUst4x.PNqKwgSHcaoceTxazjMRg1VojEpHh6S',
                    status: req.body.status,
                    resetPassword: 1
                }

                User.create(newUser)
                    .then(user => {
                        return res.status(200).json({
                            message: 'User created sussefully'
                        })
                    })
                    .catch(err => res.json({
                        message: "Error while creating use, try again"
                    }))
            }
        })
})

// login user
// @route POST: /api/user/login
router.post('/login', (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;

    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // find the user by phone
    User.findOne({
            where: {
                phone: phone
            }
        }).then(user => {
            // check for user
            if (!user) {
                return res.status(404).json({
                    phone: 'User phone not found'
                });
            }
            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        if (user.resetPassword === 1) {
                            res.json({
                                message: "Reset your password to proceed"
                            })
                        } else {

                            // create jwt payload
                            const payload = {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                phone: user.phone,
                                userType: user.userType,
                                status: user.status
                            }
                            jwt.sign(payload, key.secretOrKey, {
                                expiresIn: 14400
                            }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                        }
                    } else {
                        return res.status(400).json({
                            password: 'Password incorrect'
                        })
                    }
                })
        })
        .catch(error => {
            return res.json({
                error: 'Error while login'
            })
        })
})


// reset user password
// @route POST: /api/user/resetPassword
router.post('/resetPassword', (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;

    const userDetails = {
        phone,
        password,
        resetPassword: 0
    }
    // find the user by phone
    User.findOne({
            where: {
                phone: phone
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    phone: 'User phone not found'
                });
            }
            // check reset value
            if (user.resetPassword === 1) {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(userDetails.password, salt, (err, hash) => {
                        if (err) throw err;
                        userDetails.password = hash;
                        User.update(userDetails, {
                                where: {
                                    phone: user.phone
                                }
                            })
                            .then(user => res.json({
                                message: "Password reset was successful"
                            }))
                            .catch(err => console.log(err))
                    })
                })

            } else {
                res.json({
                    message: "As perssion to from the admin to reset password"
                })
            }
        })
})

// current user
// @route GET api/users/current
// @access private
router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.firstName,
        phone: req.user.phone,
        userType: req.user.userType,
        status: req.user.status
    });
})


module.exports = router;