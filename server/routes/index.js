const express = require('express');
const router = express.Router();

const signupRoute = require('./signup.js');
const loginRoute = require('./login.js');
const postRoute = require('./post.js');
const commentRoute = require('./comment');
const likeRoute = require('./like');

const authMiddleWare = require('../middleware/requireAuth');

router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/post', postRoute);
// router.use('/comment', commentRoute);

module.exports = router;
