import React, { useEffect, useState } from 'react';
import style from './statsBar.module.scss';

const StatsBar = ({data, btc}) => {
    // const [profit, setProfit] = useState([])
    const [topProfit, setTopProit] = useState([])
    const [topTrades, setTopTrades] = useState([])
    const [topPrem, setTopPrem] = useState([])

    let satsTotal = [];
    let initalVal = 0;
    
    const getTopProfit = () => {
        fetch("http://localhost:5050/dashboard/profit")
       .then(response => response.json())
       .then(result => setTopProit(result))
       .catch(error => console.log('error', error));
    }

    const getTopTrades = () => {
        fetch("http://localhost:5050/dashboard/trades")
       .then(response => response.json())
       .then(result => setTopTrades(result))
       .catch(error => console.log('error', error));
    }

    const getTopPrem = () => {
        fetch("http://localhost:5050/dashboard/prem")
       .then(response => response.json())
       .then(result => setTopPrem(result))
       .catch(error => console.log('error', error));
    }

    for(let i = 0; i < data.length; i++) {
        satsTotal.push(data[i].profit)
    }

    let sum = satsTotal.reduce((acc, curr) => acc + curr, initalVal);
    let sats = Number(sum.toFixed(2)).toLocaleString('en-US') 

    let btcFormat = sum / 100000000;
    let displayPrice = Number((btcFormat * btc).toFixed(2)).toLocaleString('en-US')

    let getSeven = () => {
        let sevDay = [];
        let initSevVal = 0;
        let final = []

        data = data.map((d) => sevDay.push(d.profit))

        for(let i = sevDay.length - 1; i >= sevDay.length - 8; i--) {
            final.push(sevDay[i])
        }

        final = final.reduce((acc, curr) => acc + curr, initSevVal)
        final = final / 100000000
        final  = Number(final * btc).toLocaleString('en-US')

        return Number(final).toFixed(2);
    }

    useEffect(() => {
        getTopProfit();
        getTopTrades();
        getTopPrem();
    }, [])

    return (
        <div className={`${style.statsBar}`}>

            <div className={`${style.totals}`}>
                <h2 id='satsTotal'><span>Total Sats: {sats ? sats : 'loading'}</span></h2>
                <h2 id='USDTotal'><span>Total USD: ${displayPrice ? displayPrice : 'loading'}</span></h2>
                <h2 id='lastSeven'><span>Last 7: ${getSeven()}</span></h2>
            </div>

            <div className={`${style.statsContainer}`}>
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
            </div>
            
            <div className={`${style.statsContainer}`}>
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
            </div>
            
            <div className={`${style.statsContainer}`}>
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
        </div>
    )
}

export default StatsBar;
