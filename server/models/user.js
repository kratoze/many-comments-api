//http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt

const { mongoose } = require('../db/mongoose.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  token: String,
  createdOn: { type: Date, default: Date.now },
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.pre('save', function (next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (isMatch) {
        return resolve(this);
      } else {
        reject();
      }
    });
  });
};

userSchema.methods.generateToken = function () {
  const user = this;
  const id = user._id.str;

  let token = jwt.sign({ id }, process.env.SECRET);

  user.token = token;

  return user.save().then(() => token);
};

userSchema.methods.removeToken = function () {
  const user = this;

  //user.update({ $unset: { token } });

  user.token = null;

  user.save();
};

userSchema.statics.findByToken = function (token) {
  const User = this;

  const decodedId = jwt.verify(token, process.env.SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      return authData;
    }
  });

  return User.findOne({
    _id: decodedId,
    token,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
