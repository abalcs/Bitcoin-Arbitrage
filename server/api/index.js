const router = require('express').Router();

const tradeRoutes = require('../api/tradeRoutes');

router.use('/', tradeRoutes);

module.exports = router;