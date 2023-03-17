import React from 'react';

const Header = () => {
    
    return (
        <header>
            <div className='title'>
                <img src="https://img.icons8.com/3d-fluency/94/null/money-bag-bitcoin.png" alt='Bitcoin money bag'/>
                <h2>Arbitrage Tracker</h2>
            </div>
            <div className='total'>
                <h2 id='satsTotal'>Total Sats: </h2>
                <h2 id='USDTotal'>Current $: </h2>
            </div>
        </header>
    )
}

export default Header;