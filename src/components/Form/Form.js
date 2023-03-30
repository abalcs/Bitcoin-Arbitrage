import { Box, Modal, Typography } from '@mui/material';
import React, {useState} from 'react';
import style from './form.module.scss';

const Form = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        window.location.reload()
    }

    const [date, setDate] = useState()
    const [profit, setProfit] = useState()
    const [prem, setPrem] = useState()
    const [trades, setTrades] = useState()

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid orange',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
      };
    
    const getInputs = async (e) => {
        e.preventDefault()

        let date = document.querySelector('#date')
        let profit = document.querySelector('#profit')
        let premium = document.querySelector('#premium')
        let trades = document.querySelector('#trades')

        setDate(date.value)
        setProfit(profit.value)
        setPrem(premium.value)
        setTrades(trades.value)

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
        handleOpen()
    };

    return (
        <>
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
                    <button type='submit' id='button' >Enter</button>
                </div>
            </div>
        </form>
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                New Record Added Successfully!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Date:</strong> {date}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Profit:</strong> {profit}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Premium:</strong> {prem}%
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Trades:</strong> {trades}
                </Typography>
            </Box>
        </Modal>
        </>
    );
}

export default Form;