const { Comment } = require('../models/comment');

async function getAll() {
  return await Comment.find();
}

async function getById(id) {
  return await Comment.findById(id);
}

async function getByParentId(parentId) {
  return await Comment.find({ parent: parentId }).exec();
}

async function create(userId, { parentId, text }) {
  const comment = new Comment({
    parent: parentId,
    author: userId,
    text,
  });

  await comment
    .save()
    .then((comment) =>
      comment.populate('author', 'username').populate('comments').execPopulate()
    );

  return comment;
}

async function update(id, text) {
  const comment = await Comment.findById(id);

  if (!comment) throw 'Comment not found';

  comment.text = text;

  comment.save();
}

async function _delete(id) {
  await Comment.findByIdAndRemove(id);
}

module.exports = {
  getAll,
  getById,
  getByParentId,
  create,
  update,
  delete: _delete,
};
