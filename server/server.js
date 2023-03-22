// const getTrades = require('../server/api/tradeRoutes');
const Trade = require('./models/Trade')
const express = require('express');
const path = require('path');
// const routes = require('./api/tradeRoutes');
const db = require('./config/connection');

const PORT = process.env.PORT || 5050;
// express returns an Object
const app = express(); // instance = Object

// Setup our server
app.use('/', express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Trade.findAll({
    attributes: [
        'id',
        'date',
        'revenue',
        'profit',
        'prem',
        'trades'
    ],
  })
  .then(data => {
      res.json(data);
  })
})

// routes(app);

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