const express = require('express');
const router = express.Router();

const userService = require('../services/user.services');
const authMiddleware = require('../middleware/requireAuth');

router.post('/', async (req, res) => {
  try {
    const user = await userService.authenticate(req.body).then((user) => user);
    const token = await user.generateToken();
    res.header('auth', token).send({ username: user.username, id: user._id });
  } catch (err) {
    res.status(401).send({
      error:
        'The username or password you entered is incorrect. Please try again.',
    });
  }
});

//Logout
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
