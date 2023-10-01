import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';


export default function Signup() {
    const [userName, setUserName] = React.useState('')
    const [inValidUserName, setInValidUserName] = React.useState(false)
    const [showPassword1, setShowPassword1] = React.useState(false)
    const [showPassword2, setShowPassword2] = React.useState(false)
    const [password1, setPassword1] = React.useState('')
    const [password2, setPassword2] = React.useState('')
    const [inValidPassword, setInValidPassword] = React.useState(false)
    const [mismatched, setMismatch] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [inValidEmail, setInValidEmail] = React.useState(false)
    const [email, setEmail] = React.useState('');

    const handleSignup = (e) => {
        e.preventDefault()
        console.log(`signup. username=${userName}, password=${password1}`)
    }
    const handleUserNameChange = (e) => {
        e.preventDefault()
        if (e.target.value.length > 10) {
            setErrorMsg('The length of user name should be not greater than 10')
            setInValidUserName(true)
        } else {
            setUserName(e.target.value)
            setInValidUserName(false)
            setErrorMsg('')
        }
    }

    const handleClickShowPassword1 = (e) => {
        e.preventDefault()
        setShowPassword1(!showPassword1)
    }
    const handleClickShowPassword2 = (e) => {
        e.preventDefault()
        setShowPassword2(!showPassword2)
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value);
    }
    const handlePassword1Change = (e) => {
        e.preventDefault()
        setPassword1(e.target.value)
    }
    const handlePassword2Change = (e) => {
        e.preventDefault()
        setPassword2(e.target.value)
        if (e.target.value !== password1) {
            setErrorMsg('Password is not matched')
            setMismatch(true)
        } else {
            setErrorMsg('')
            setMismatch(false)
        }
    }

    const validateEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email.length > 0 && !emailRegex.test(email)) {
            setInValidEmail(true);
            setErrorMsg('Please input valid email')
        } else {
            setInValidEmail(false);
            setErrorMsg('')
        }
    }

    const validatePassword = () => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!passRegex.test(password1)) {
            setErrorMsg('Password should contain at least one letter, one number and minimum eight characters')
            setInValidPassword(true)
        }else {
            setErrorMsg('')
            setInValidPassword(false)
        }
    }

    useEffect(() => validateEmail(), [email])
    useEffect(() => validatePassword(), [password1])

    return (
        <Container maxWidth='xs'>
            <CssBaseline/>
            <Box sx={{display: 'flex'}}>
                <Box component='form' onSubmit={handleSignup}
                sx={{ mt: 20, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 2
                    } 
                  }}
                noValidate autoComplete='off'
                >
                    <Box sx={{height:50, mb:2}} color='red'>
                        {errorMsg}
                    </Box>
                    <TextField
                        label='User Name' 
                        variant="outlined"
                        color='primary'
                        error={inValidUserName}
                        fullWidth
                        required
                        onChange={handleUserNameChange}
                    ></TextField>
                    <FormControl variant="outlined" fullWidth color='primary' required error={inValidPassword}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id='password1' 
                            aria-label='toggle password visibility'
                            label='Password'
                            type={showPassword1 ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword1}>
                                        {showPassword1 ? <VisibilityOff/>: <Visibility /> }
                                    </IconButton>
                                </InputAdornment>}
                            onChange={handlePassword1Change}
                            />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth color='primary' required error={mismatched}>
                        <InputLabel htmlFor="outlined-adornment-password-again">Password</InputLabel>
                        <OutlinedInput
                            id='password2' 
                            aria-label='toggle password visibility'
                            label='Password'
                            type={showPassword2 ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword2}>
                                        {showPassword2 ? <VisibilityOff/>: <Visibility /> }
                                    </IconButton>
                                </InputAdornment>}
                            onChange={handlePassword2Change}
                            />
                            
                    </FormControl>
                    <TextField
                        label='Email' 
                        variant="outlined"
                        color='primary'
                        fullWidth
                        type='email'
                        value={email}
                        error={inValidEmail}
                        onChange={handleEmailChange}
                    ></TextField>
                    <Button variant="contained" type="submit">Signup</Button>
                </Box>
            </Box>
        </Container>
  )
}

