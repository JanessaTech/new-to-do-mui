import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        name: '',
        inValidName: false,
        showPassword: false,
        inValidPassword: false,
        password: '',
        errorMsg: ''
    })

    const handleUserNameChange = (e) => {
        e.preventDefault()

        if (e.target.value.length > 10) {
            setState({
              ...state,
              inValidName: true,
              errorMsg: 'The length of user name should be not greater than 10'
            })
        } else {
            setState({
                ...state,
                name: e.target.value,
                inValidName: false,
                errorMsg: ''
            })
        }
    }

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setState({
            ...state,
            showPassword: !state.showPassword
        })
    }
    const handlePasswordChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            password: e.target.value
        })
    }

    const validatePassword = () => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!passRegex.test(state.password)) {
            setState({
                ...state,
                errorMsg: 'Password should contain at least one letter, one number and minimum eight characters',
                inValidPassword: true
            })
        }else {
            setState({
                ...state,
                errorMsg: '',
                inValidPassword: false
            })
        }
    }

    useEffect(() => validatePassword(), [state.password])

    const handleLogin = (e) => {
        e.preventDefault()
        if (state.inValidName || state.inValidPassword) return
        console.log(`login. name=${state.name}, password=${state.password}`)
        const login = {
            name : state.name,
            password: state.password
        }
        let options = {};
        options = {
            url: 'http://127.0.0.1:3100/apis/v1/users/login',
            method: 'post',
            data: login
        }
        axios(options)
            .then((response) => {
                const user = response.data.data
                console.log('login ok')
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/home')
            })
            .catch((err) => {
                console.log('login error')
                console.log(err.response.data)
                setState({...state, errorMsg: err.response.data.message || 'Please signup first'})
            })
    }

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
                    {state.errorMsg}
                </Box>
                <TextField
                    label='User Name' 
                    variant="outlined"
                    color='primary'
                    error={state.inValidName}
                    fullWidth
                    required
                    onChange={handleUserNameChange}
                ></TextField>
                <FormControl variant="outlined" fullWidth color='primary' required error={state.inValidPassword}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput 
                            id='password' 
                            aria-label='toggle password visibility'
                            label='Password'
                            type={state.showPassword ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword}>
                                        {state.showPassword ? <VisibilityOff/>: <Visibility /> }
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