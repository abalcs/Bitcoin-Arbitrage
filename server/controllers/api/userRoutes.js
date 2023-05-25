const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../utils/auth');


router.get('/', (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
    .then(data => {
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.email;
        req.session.loggedIn = true;

        res.json({ user: data.username, message: 'You are now logged in!', session: req.session });
      });
    });
});

// LOGIN
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(data => {
    if (!data) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = data.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = data.id;
      req.session.username = data.email;
      req.session.loggedIn = true;

      res.json({ user: data.username, message: 'You are now logged in!', session: req.session });
    })
  })
});

router.get('/login', (req, res) => {
  res.send(req.session)
  // if(req.session.loggedIn === true) {
  //   res.send({loggedIn: true, user: req.session.user_id})
  // } else {
  //   res.send(req.session)
  // }
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;