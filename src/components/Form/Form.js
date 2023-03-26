import React from 'react';
import style from './form.module.scss';

const Form = () => {
    
    const getInputs = async (e) => {
        e.preventDefault()

        let date = document.querySelector('#date')
        let profit = document.querySelector('#profit')
        let premium = document.querySelector('#premium')
        let trades = document.querySelector('#trades')

        await fetch('http://localhost:5050/', {
            method: 'Post',
            body: JSON.stringify({
                date: date.value,
                profit: profit.value,
                prem: premium.value,
                trades: trades.value
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        date.value = ''
        profit.value = ''
        premium.value = ''
        trades.value = ''
    };
   
    return (
        <form id='form' onSubmit={getInputs}>
            <div className={`${style.formContainer}`}>
                <div className={`${style.formInput}`}>
                    <label>DATE</label>
                    <input id='date' type='date' required></input>
                </div>
                <div className={`${style.formInput}`}>
                    <label>PROFIT (Sats)</label>
                    <input id='profit' type='text' required></input>
                </div>
                <div className={`${style.formInput}`}>
                    <label>PREMIUM %</label>
                    <input id='premium' type='text' required></input>
                </div>
                <div className={`${style.formInput}`}>
                    <label># of TRADES</label>
                    <input id='trades' type='number' min='1' required></input>
                </div>
                <div className={`${style.buttonInput}`}>
                    <button type='submit' id='button'>Enter</button>
                </div>
            </div>
        </form>
    );
}

export default Form;