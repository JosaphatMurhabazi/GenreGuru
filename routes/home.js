const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('VIDLY MOVIE GENRES');
});

module.exports = router;
