const express = require('express');
const router = express.Router();

const postService = require('../services/post.services');
const commentService = require('../services/comment.services');
const likeService = require('../services/like.services');
const authMiddleware = require('../middleware/requireAuth');

router.get('/', (req, res, next) => {
  postService
    .getAll()
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.post('/', authMiddleware, (req, res, next) => {
  postService
    .create(req.body)
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.delete('/', authMiddleware, async (req, res, next) => {
  // const postToDelete = await postService
  //   .getById(req.body.postId)
  //   .catch((err) => next(err));
  // if (postToDelete.author !== req.user._id) {
  //   res.json({ message: 'You are not the author of this post' });
  // }

  postService
    .delete(req.body.postId)
    .then((post) =>
      post ? res.json(post) : res.json({ message: 'Unable to delete post' })
    )
    .catch((err) => next(err));
});

router.get('/comment', (req, res, next) => {
  commentService
    .getAll()
    .then((comments) => res.json(comments))
    .catch((err) => next(err));
});

router.get('/comment/:parentId', (req, res, next) => {
  commentService
    .getByParentId(req.params.parentId)
    .then((comments) => res.json(comments))
    .catch((err) => next(err));
});

router.post('/comment', authMiddleware, (req, res, next) => {
  commentService
    .create(req.user._id, req.body)
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
});

router.delete('/comment', authMiddleware, (req, res, next) => {
  commentService
    .delete(req.body.commentId)
    .then((comment) =>
      comment
        ? res.json(comment)
        : res.json({ message: 'unable to delete comment' })
    )
    .catch((err) => next(err));
});

router.get('/like', authMiddleware, (req, res, next) => {
  likeService
    .getAll()
    .then((likes) => res.json(likes))
    .catch((err) => next(err));
});

router.get('/like/:parentId', authMiddleware, (req, res, next) => {
  likeService
    .getByParentId(req.params.parentId)
    .then((like) => res.json(like))
    .catch((err) => next(err));
});

router.post('/like', authMiddleware, (req, res, next) => {
  likeService
    .create(req.body)
    .then((like) => res.json(like))
    .catch((err) => next(err));
});

router.delete('/like', authMiddleware, (req, res, next) => {
  likeService
    .delete(req.body.likeId)
    .then((like) =>
      like ? res.json(like) : res.json({ message: 'unable to delete like' })
    )
    .catch((err) => next(err));
});

module.exports = router;
