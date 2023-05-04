import React from 'react';
import style from './header.module.scss';

const Header = () => {

    return (
        <header>
            <div
            className={`${style.title}`}>
                <img 
                src="https://img.icons8.com/3d-fluency/94/null/money-bag-bitcoin.png" 
                alt='Bitcoin money bag'/>
                <h2>Arbitrage Tracker</h2>
            </div>
        </header>
    )
}

export default Header;