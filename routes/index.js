const express = require('express');
const router = express.Router();

const AdminUser = require('../models/adminUser');
const User = require('../models/user');

const authController = require('../controller/authController');

const jwtAuth = require('../middlewares/jwtAuth')

const { body, validationResult } = require('express-validator');

router.get('/test', (req, res)=>{
  res.send({
    message: 'test 1.1'
  })
});


/**
 * Admin API's
 */

router.post(
  '/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isStrongPassword(),
  body('email').custom(value => {
    return new Promise((resolve, reject)=>{
      AdminUser.findOne({
        email: value
      }, function (err, user) {
        console.log(err, user, value);
        if(user) {
          return reject('e-mail address in use');
        }
        resolve(user);
      })
    })
  }),
  authController.register_post
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isStrongPassword(),
  authController.login_post
);

/**
 * User API's
 */

router.get(
  '/user',
  jwtAuth.verifyToken,
  authController.user_get
);

router.post(
  '/user',
  jwtAuth.verifyToken,
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  body('email').isEmail(),
  body('dob').notEmpty(),
  body('role').notEmpty(),
  body('city').notEmpty(),
  body('state').notEmpty(),
  body('role').custom(value => {
    return new Promise((resolve, reject)=>{
      if(value == "Admin" || value == "Manager" || value == "User") {
        return resolve(true);
      }else {
        return reject('Invalid Role');
      }
    })
  }),
  body('email').custom(value => {
    return new Promise((resolve, reject)=>{
      User.findOne({
        email: value
      }, function (err, user) {
        if(user) {
          return reject('e-mail address in use');
        }
        resolve(user);
      })
    })
  }),
  authController.user_post
)

module.exports = router; 