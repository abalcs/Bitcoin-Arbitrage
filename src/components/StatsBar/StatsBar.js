import React, { useEffect, useState } from 'react';
import style from './statsBar.module.scss';

const StatsBar = () => {
    // const [profit, setProfit] = useState([])
    const [topProfit, setTopProit] = useState([])
    const [topTrades, setTopTrades] = useState([])
    const [topPrem, setTopPrem] = useState([])
    
    const getTopProfit = () => {
        fetch("http://localhost:5050/api/trades/profit")
       .then(response => response.json())
       .then(result => setTopProit(result))
       .catch(error => console.log('error', error));
    }

    const getTopTrades = () => {
        fetch("http://localhost:5050/api/trades/trades")
       .then(response => response.json())
       .then(result => setTopTrades(result))
       .catch(error => console.log('error', error));
    }

    const getTopPrem = () => {
        fetch("http://localhost:5050/api/trades/prem")
       .then(response => response.json())
       .then(result => setTopPrem(result))
       .catch(error => console.log('error', error));
    }


    console.log(topProfit)

    useEffect(() => {
        getTopProfit();
        getTopTrades();
        getTopPrem();
    }, [])

    return (
        <div className={`${style.statsBar}`}>
            <div className={`${style.profit}`}>Top Profit Days</div>
            {topProfit ? (
                topProfit.map((profit, i) => {
                    return (
                        <ul className={`${style.profit__list}`} key={i}>
                            <li>{profit.profit}</li>
                            <li>{profit.date}</li>
                        </ul>
                    )
                })
            ): 'Loading...'}

            <div className={`${style.trade}`}>Top Trade Days</div>
            {topTrades ? (
                topTrades.map((trades, i) => {
                    return (
                        <ul className={`${style.profit__list}`} key={i}>
                            <li>{trades.trades}</li>
                            <li>{trades.date}</li>
                        </ul>
                    )
                })
            ): 'Loading...'}

            <div className={`${style.yield}`}>Top Premium Days</div>
            {topPrem ? (
                topPrem.map((prem, i) => {
                    return (
                        <ul className={`${style.profit__list}`} key={i}>
                            <li>{prem.prem}%</li>
                            <li>{prem.date}</li>
                        </ul>
                    )
                })
            ): 'Loading...'}
        </div>
    )
}

export default StatsBar;
