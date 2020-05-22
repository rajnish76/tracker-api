const express = require('express');
const router = express.Router();

const Track = require('../models/Track');
const { protect } = require('../middleware/requireAuth');

router.use(protect);

router.get('/track', async (req, res, next) => {
  const track = await Track.find({ userId: req.user.id });
  res.json(track);
});

router.post('/track', async (req, res, next) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .json({ error: 'You must provide a name and locations' });
  }
  try {
    const track = await Track.create({
      name,
      locations,
      userId: req.user.id,
    });
    res.json({ track });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});
module.exports = router;
