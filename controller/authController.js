require('dotenv').config();

const {validationResult} = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminUser = require('../models/adminUser');
const User = require('../models/user');

exports.register_post = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json( {errors: errors.array()})
  }

  const adminUser = new AdminUser({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
  })

  try {
    await adminUser.save();
    res.send(adminUser);
  }catch (error) {
    res.status(500).send(error)
  }
}

exports.login_post = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json( {errors: errors.array()})
  }

  AdminUser
    .findOne({
        email: req.body.email
    }, function (err, user) {
      if(!user) {
       return res.status(404).send({message: "User Not Found"});
      }
      console.log(req.body.password,
        user.password, bcrypt.compareSync(
        req.body.password,
        user.password
      ))
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if(!passwordIsValid) {
        return res.status(401).send( {
          message: "Invalid Password"
        })
      }

      let token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 * 1});

      res.status(200).send({
        id: user._id,
        email: user.email,
        name: user.name,
        token: token
      })
    }) 
}

exports.user_post = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json( { errors: errors.array() })
  }

  console.log('Called');
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    dob: req.body.dob,
    role: req.body.role,
    city: req.body.city,
    state: req.body.state,
  })

  try {
    await user.save();
    res.send(user);
  }catch (error) {
    res.status(500).send(error)
  }
}

exports.user_get = async (req, res) => {
  const users = await User.find({});
  res.send(users);
}