import { Box, Button, Input, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import style from './header.module.scss';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [signOpen, setSignupOpen] = useState(false);
    
    const handleOpen = (e) => {
        // e.preventDefault();
        setSignupOpen(false)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
        // window.location.reload()
    }

    const signupOpen = (e) => {
        e.preventDefault();
        setOpen(false)
        setSignupOpen(true)
    };

    const signupClose = () => {
        setSignupOpen(false);
        // window.location.reload()
    }

    const getLogin = async (e) => {
        e.preventDefault()

        let email = document.querySelector('#email').value
        let password = document.querySelector('#password').value

        const login = await fetch('http://localhost:5050/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { 
                'Content-Type': 'application/json',
                'Access-control-allow-origin': '*'
            },
            credentials: 'include'
        })
        let data = await login.json()
        console.log(data)
        if (login.ok) {
            handleClose()
            // document.location.replace('/dashboard');
        } else {
            alert('Username or Password Incorrect.  Please try again.')
        }
    };

    const getSignup = async (e) => {
        e.preventDefault()

        let email = document.querySelector('#email').value
        let password = document.querySelector('#password').value
        
        if(password.length >= 7) {
            const create = await fetch('http://localhost:5050/api/user', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Access-control-allow-origin': '*'
                },
            })

            if (create.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to create account.');
            }
        } else {
            alert('Password must be at least 8 characters in length.')
            return
        }
       
        signupClose()
    };

    const modalStyle = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
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

    return (
        <header>
            <div
            className={`${style.title}`}>
                <img 
                src="https://img.icons8.com/3d-fluency/94/null/money-bag-bitcoin.png" 
                alt='Bitcoin money bag'/>
                <h2>Arbitrage Tracker</h2>
            </div>
            <Button onClick={handleOpen} variant="contained">Login</Button>
            
            {/* ***LOGIN MODAL***  */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Sign In
                    </Typography>
                    <Input sx={{margin: '10px'}} id="email" placeholder="Email" type='email' variant="solid" />
                    <Input sx={{margin: '10px'}} id="password" placeholder="Password" variant="solid" />
                    <Button sx={{margin: '10px'}} onClick={getLogin} variant='contained'>Sign In</Button>

                    <Typography>
                    Don't have an account? Click here to sign up
                    </Typography>
                    <Button onClick={signupOpen}>Create Account</Button>
                </Box>
            </Modal>

            {/* ***SIGN UP MODAL***  */}
            <Modal
                open={signOpen}
                onClose={signupClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Sign Up
                    </Typography>
                    <Input sx={{margin: '10px'}} id="email" placeholder="Email" type='email' variant="solid" />
                    <Input sx={{margin: '10px'}} id="password" placeholder="Password" variant="solid" />
                    <Button sx={{margin: '10px'}} onClick={getSignup} variant='contained'>SUBMIT</Button>
                    <Typography>
                    Already have an account? Click here to log in
                    </Typography>
                    <Button onClick={handleOpen}>Log In</Button>
                </Box>
            </Modal>
        </header>
    )
}

export default Header;