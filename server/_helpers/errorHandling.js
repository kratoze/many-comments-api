//https://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management#helpers-folder

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ error: err });
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ error: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ error: err.message });
}

module.exports = errorHandler;
