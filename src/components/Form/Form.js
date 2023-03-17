import React, { useState } from 'react';
import style from './form.module.scss';

const Form = () => {
    const [dateLog, setDateLog] = useState('')
    const [profitLog, setProfitLog] = useState('')
    const [premiumLog, setPremiumLog] = useState('')

    let date = document.querySelector('#date')
    let profit = document.querySelector('#profit')
    let premium = document.querySelector('#premium')

    const getInputs = (e) => {
        e.preventDefault()

        setDateLog(date.value)
        setProfitLog(profit.value)
        setPremiumLog(premium.value)

        date.value = ''
        profit.value = ''
        premium.value = ''
    }

    // Write post route to send thru api to db

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
                <div className={`${style.buttonInput}`}>
                    <button type='submit' id='button'>Enter</button>
                </div>
            </div>
        </form>
    );
}

export default Form;