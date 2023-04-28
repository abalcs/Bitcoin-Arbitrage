const router = require('express').Router();

const tradeRoutes = require('../api/tradeRoutes');

router.use('/api', tradeRoutes);

module.exports = router;