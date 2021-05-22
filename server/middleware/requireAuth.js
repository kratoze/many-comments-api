const { User } = require('../models/user');

const requireAuth = async (req, res, next) => {
  const token = req.header('auth');
  try {
    const user = await User.findOne({ token: token });
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

module.exports = requireAuth;
