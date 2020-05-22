const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { protect } = require('../middleware/requireAuth');

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = user.getSignedJwtToken();
    res.json({ status: 'success', data: user, token });
  } catch (error) {
    return res.status(422).json({ status: 'failed', data: error.errmsg });
  }
});

router.get('/me', protect, async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.json({ user });
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: 'Must enter email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'Invalid email or password' });
  }
  try {
    const match = await user.matchPassword(password);
    if (!match) {
      return res.status(404).json({ error: 'Invalid password' });
    }
    const token = user.getSignedJwtToken();
    res.json({ data: user, token });
  } catch (error) {
    return res.status(422).json({ error: 'Invalid email or password' });
  }
});

module.exports = router;
