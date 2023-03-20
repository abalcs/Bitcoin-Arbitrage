const seedTrades = require('../seeds/trades-seeds');

const sequelize = require('../config/connection');


const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedTrades();
    console.log('\n----- TRADES SEEDED -----\n');

  process.exit(0);
};

seedAll();