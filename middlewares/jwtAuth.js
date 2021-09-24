require('dotenv').config();

const jwt = require('jsonwebtoken');


verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(404).send({
      message: "No token provided"
    })
  }

  token = token.replace('Bearer ', '');

  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if(err) {
      return res.status(401).send({
        message: "Unathorized!"
      });
    }
    req.userId = decode.id;
    next();
  });
}

module.exports = {
  verifyToken
}