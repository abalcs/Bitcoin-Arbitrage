import React, { useState } from 'react';

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

    return (
        <form id='form' onSubmit={getInputs}>
            <div className='formContainer'>
                <div className='formInput'>
                    <label>DATE</label>
                    <input id='date' type='date' required></input>
                </div>
                <div className='formInput'>
                    <label>PROFIT (Sats)</label>
                    <input id='profit' type='text' required></input>
                </div>
                <div className='formInput'>
                    <label>PREMIUM %</label>
                    <input id='premium' type='text' required></input>
                </div>
                <div className='buttonInput'>
                    <button type='submit' id='button'>Enter</button>
                </div>
            </div>
        </form>
    );
}

export default Form;