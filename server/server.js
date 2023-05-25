const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session')
const path = require('path');
const routes = require('./controllers');
// const db = require('./config/connection');
// const cookieSession = require('cookie-session');
// const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5050;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'exaHash',
  cookie: {
      // path: '/',
      // httpOnly: true,
      // secure: false,
      // expires: 10 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  }),
};

let corsOptions = {
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET"],
}

// For Heroku use if it has issue with saving cookie session data
// app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true'); // Add this line
  next();
});


app.use(express.json());
app.use(session(sess));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser())

// app.use('/', express.static(path.join(__dirname, 'client/build')));

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
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});