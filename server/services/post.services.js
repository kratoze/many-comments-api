const { Post } = require('../models/post');

async function getAll() {
  return await Post.find();
}

async function getById(id) {
  return await Post.findById(id);
}

async function create(userParam) {
  const post = new Post(userParam);

  await post
    .save()
    .then((post) =>
      post
        .populate('author', 'username')
        .populate('comments', '_id')
        .execPopulate()
    );

  return post;
}

async function update(postId, userId, text) {
  const post = await Post.findById(postId);

  if (!post) throw 'Post not found';

  if (post.author !== userId) {
    throw 'Not authorised to update this post';
  }

  post.text = text;

  post.save();
}

async function _delete(id) {
  console.log(id);
  return await Post.findByIdAndRemove(id, (post) => post);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
