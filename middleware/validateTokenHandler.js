const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
      console.log('RRR', req.headers);
      console.log('RRRR', req.header);
      let token;
      let authHeader = req.headers.authorization || req.headers.authorization;
      console.log('check authHeader', authHeader);
      if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                  if (err) {
                        res.status(401);
                        throw new Error('User is not authorised')
                  }
                  console.log('decoded', decoded);
                  req.user = decoded.user;
                  next();
            });
            if (!token) {
                  res.status(401);
                  throw new Error('User is not authorised or token is missing in the request');
            }
      };
});

module.exports = validateToken;