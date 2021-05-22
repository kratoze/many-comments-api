const express = require('express');
const router = express.Router();

const userSevice = require('../services/user.services');

router.post('/', async (req, res, next) => {
  try {
    const user = await userSevice.create(req.body);

    const token = await user.generateToken();
    console.log(token);
    res.header('auth', token).send({ username: user.username, id: user._id });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
