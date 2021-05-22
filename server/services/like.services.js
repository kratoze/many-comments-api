const { Like } = require('../models/like');

async function getAll() {
  return await Like.find();
}

async function getById(id) {
  return await Like.findById(id);
}

async function getByParentId(parentId) {
  return await Like.find({ parent: parentId }).exec();
}

async function create({ userId, parentId, positive }) {
  const like = new Like({
    parent: parentId,
    author: userId,
    positive,
  });
  await like.save();

  return like;
}

async function update(id, positive) {
  const like = await Like.findById(id);

  if (!comment) throw 'Like not found';

  like.positive = positive;

  like.save();
}

async function _delete(id) {
  await Like.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  create,
  getByParentId,
  delete: _delete,
};
