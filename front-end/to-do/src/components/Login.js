import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
    const [userName, setUserName] = React.useState('')
    const [inValidUserName, setInValidUserName] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [inValidPassword, setInValidPassword] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [errorMsg, setErrorMsg] = React.useState('')

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

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const validatePassword = () => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!passRegex.test(password)) {
            setErrorMsg('Password should contain at least one letter, one number and minimum eight characters')
            setInValidPassword(true)
        }else {
            setErrorMsg('')
            setInValidPassword(false)
        }
    }

    useEffect(() => validatePassword(), [password])

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(`login. username=${userName}, password=${password}`)
    }

    const ButtonWithLink = () => (
        <Link to="/about">
         <Button variant="contained" color="primary">
           About Page
         </Button>
        </Link>
      )
  return (
    <Container maxWidth='xs'>
        <CssBaseline/>
        <Box sx={{display: 'flex'}}>
            <Box component='form' onSubmit={handleLogin}
                sx={{ mt: 20, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 2
                } 
            }} noValidate autoComplete='off'>
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
                            id='password' 
                            aria-label='toggle password visibility'
                            label='Password'
                            type={showPassword ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityOff/>: <Visibility /> }
                                    </IconButton>
                                </InputAdornment>}
                            onChange={handlePasswordChange}
                            />
                </FormControl>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Button variant="contained" type="submit">Login</Button>
                    <Button component={Link} to="/Signup" variant="text" color="primary">
                    signup
                    </Button>                   
                </Box>                          
            </Box>
        </Box>
    </Container>
  )
}