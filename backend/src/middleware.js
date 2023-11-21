const jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length); // Remove the 'Bearer ' prefix
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Por favor, faça login para acessar esta funcionalidade.'
    });
  }
};

module.exports = {
  checkToken: checkToken
};