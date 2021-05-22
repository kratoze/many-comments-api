//https://jasonwatmore.com/post/2018/06/14/nodejs-mongodb-simple-api-for-authentication-registration-and-user-management#user-service-js

const { User } = require('../models/user');

async function authenticate({ username, password }) {
  const user = await User.findOne({ username: username });
  if (user) {
    return await user.comparePassword(password);
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findbyId(id);
}

async function create(userParam) {
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username ' + userParam.username + ' is already taken';
  }

  const user = new User(userParam);

  await user.save();

  return user;
}

async function update(id, userParam) {
  const user = User.findById(id);

  if (!user) throw 'User not found';

  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    throw 'Username ' + userParam.username + ' is already taken';
  }

  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
