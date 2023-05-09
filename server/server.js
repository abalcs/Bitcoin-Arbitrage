const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session')
const path = require('path');
const routes = require('./controllers');
const db = require('./config/connection');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5050;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'exaHash',
  cookie: {
      expires: 10 * 60 * 1000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  }),
};

app.use(cors())
app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(session(sess))
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Heroku 
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('../client/build'));
  // Express serve up index.html file if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// sync sequelize models to the database, then turn on the server
db.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  });