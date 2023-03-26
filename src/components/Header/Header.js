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
    let displayPrice = Number(btcFormat * btc).toFixed(2).toLocaleString('en-US')
    
    return (
        <header>
            <div className={`${style.title}`}>
                <img src="https://img.icons8.com/3d-fluency/94/null/money-bag-bitcoin.png" alt='Bitcoin money bag'/>
                <h2>Arbitrage Tracker</h2>
            </div>
            <div className={`${style.total}`}>
                <h2 id='satsTotal'>Total Sats: {sats}</h2>
                <h2 id='USDTotal'>Current $: {displayPrice}</h2>
            </div>
        </header>
    )
}

export default Header;