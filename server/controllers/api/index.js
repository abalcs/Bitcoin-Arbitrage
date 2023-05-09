const router = require('express').Router();

const tradeRoutes = require('./tradeRoutes');
const userRoutes = require('./userRoutes')

router.use('/trades', tradeRoutes);
router.use('/user', userRoutes)

module.exports = router;