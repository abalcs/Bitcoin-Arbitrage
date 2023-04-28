const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Eleanor2018!',
        database: 'arbitrage_db'
    },
    console.log('Connected to arbitrage_db database')
);

class TradeData {
    topTradeDays() {
        db.query(`SELECT * FROM trades ORDER BY trades.trades DESC LIMIT 5`,  (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    }
    
    topProfitDays() {
        db.query(`SELECT * FROM trades ORDER BY trades.profit DESC LIMIT 5`,  (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    }
    
    static orderByDate() {
        return db.query(`SELECT * FROM trades ORDER BY trades.date ASC`,  (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
            }
        })
    }   
}

module.exports = TradeData;