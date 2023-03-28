import React from 'react';
import style from './header.module.scss';

const Header = ({data, btc}) => {
    let satsTotal = [];
    let initalVal = 0;

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
        final  = Number((final * btc).toFixed(2)).toLocaleString('en-US')

        return final
    }

    return (
        <header>
            <div className={`${style.title}`}>
                <img src="https://img.icons8.com/3d-fluency/94/null/money-bag-bitcoin.png" alt='Bitcoin money bag'/>
                <h2>Arbitrage Tracker</h2>
            </div>
            <div className={`${style.total}`}>
                <h2 id='satsTotal'>Total Sats: {sats}</h2>
                <h2 id='USDTotal'>Total USD $: {displayPrice}</h2>
                <h2 id='lastSeven'>Last 7 $: {getSeven()}</h2>
            </div>
        </header>
    )
}

export default Header;