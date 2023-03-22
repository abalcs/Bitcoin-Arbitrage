// const express = require('express');
// const Trade = require('../models/Trade');

// const router = express();

// router.get('/', (req, res) => {
//     Trade.findAll({
//         attributes: [
//             'id',
//             'date',
//             'revenue',
//             'profit',
//             'prem',
//             'trades'
//         ],
//     })
//     .then(dbPostData => {
//         // const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.json(dbPostData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// })

// module.exports = router;