const express = require('express');
const { logger } = require('../config/logger');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/test', async (req, res) => {
  logger.debug(req.body);
  res.render('index', { title: 'Express' });
});

module.exports = router;
