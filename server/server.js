const express = require('express');
const path = require('path');
const routes = require('./api/');
const db = require('./config/connection');
const cors = require('cors')

const PORT = process.env.PORT || 5050;
// express returns an Object
const app = express(); // instance = Object

// Setup our server
app.use(cors())
app.use('/', express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
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