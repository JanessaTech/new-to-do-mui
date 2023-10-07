import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function Signup() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        name: '',
        inValidName: false,
        showPassword1: false,
        showPassword2: false,
        password1: '',
        password2: '',
        inValidPassword: false,
        mismatched: false,
        errorMsg: '',
        inValidEmail: false,
        email: '',
        age: 20
    })

    const handleSignup = (e) => {
        e.preventDefault()
        console.log('inValidUserName=', state.inValidName)
        console.log('inValidPassword=', state.inValidPassword)
        console.log('mismatched=', state.mismatched)
        console.log('inValidEmail=', state.inValidEmail)
        if (state.inValidName || state.inValidPassword ||state. mismatched || state.inValidEmail) return
        console.log(`signup. username=${state.name}, password=${state.password1}, email=${state.email}, age=${state.age}`)

        const signup = {
            name : state.name,
            password : state.password1,
            age: state.age,
            roles: ["user"],
            email : state.email
        }
        let options = {};
        options = {
            url: 'http://127.0.0.1:3100/apis/v1/users/register',
            method: 'post',
            data: signup
        }
        axios(options)
            .then((response) => {
                navigate('/login')
            })
            .catch((err) => {
                console.log(err.response.data)
                setState({
                    ...state,
                    errorMsg: err.response.data.message
                })
            })

    }
    const handleNameChange = (e) => {
        e.preventDefault()
        if (e.target.value.length > 10) {
            setState({
                ...state,
                errorMsg: 'The length of user name should be not greater than 10',
                inValidName: true,
                name: e.target.value
            })
        } else {
            setState({
                ...state,
                errorMsg: '',
                inValidName: false,
                name: e.target.value
            })
        }
    }

    const handleClickShowPassword1 = (e) => {
        e.preventDefault()
        setState({
            ...state,
            showPassword1: !state.showPassword1
        })
    }
    const handleClickShowPassword2 = (e) => {
        e.preventDefault()
        setState({
            ...state,
            showPassword2: !state.showPassword2
        })
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
           email: e.target.value 
        })
    }
    const handlePassword1Change = (e) => {
        e.preventDefault()
        setState({
            ...state,
            password1: e.target.value
        })
    }
    const handlePassword2Change = (e) => {
        e.preventDefault()
        if (e.target.value !== state.password1) {
            setState({
                ...state,
                errorMsg: 'Password is not matched',
                mismatched: true,
                password2: e.target.value
            })
        } else {
            setState({
                ...state,
                errorMsg:'',
                mismatched: false,
                password2: e.target.value
            })
        }
    }

    const validateEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (state.email.length > 0 && !emailRegex.test(state.email)) {
            setState({
                ...state,
                inValidEmail: true,
                errorMsg: 'Please input valid email'
            })
        } else {
            setState({
                ...state,
                inValidEmail: false,
                errorMsg: ''
            })
        }
    }

    const validatePassword = () => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!passRegex.test(state.password1)) {
            setState({
                ...state,
                errorMsg:'Password should contain at least one letter, one number and minimum eight characters',
                inValidPassword: true
            })
        }else {
            setState({
                ...state,
                errorMsg:'',
                inValidPassword: false
            })
        }
    }

    useEffect(() => validateEmail(), [state.email])
    useEffect(() => validatePassword(), [state.password1])

    const handleAgeChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            age: e.target.value
        })
    }

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
                        {state.errorMsg}
                    </Box>
                    <TextField
                        label='User Name' 
                        variant="outlined"
                        color='primary'
                        error={state.inValidName}
                        fullWidth
                        required
                        onChange={handleNameChange}
                    ></TextField>
                    <FormControl variant="outlined" fullWidth color='primary' required error={state.inValidPassword}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id='password1' 
                            aria-label='toggle password visibility'
                            label='Password'
                            type={state.showPassword1 ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword1}>
                                        {state.showPassword1 ? <VisibilityOff/>: <Visibility /> }
                                    </IconButton>
                                </InputAdornment>}
                            onChange={handlePassword1Change}
                            />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth color='primary' required error={state.mismatched}>
                        <InputLabel htmlFor="outlined-adornment-password-again">Password</InputLabel>
                        <OutlinedInput
                            id='password2' 
                            aria-label='toggle password visibility'
                            label='Password'
                            type={state.showPassword2 ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword2}>
                                        {state.showPassword2 ? <VisibilityOff/>: <Visibility /> }
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
                        value={state.email}
                        error={state.inValidEmail}
                        onChange={handleEmailChange}
                    ></TextField>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.age}
                            label="Age"
                            onChange={handleAgeChange}
                        >
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            <MenuItem value={40}>Forty</MenuItem>
                            <MenuItem value={50}>Fifty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" type="submit">Signup</Button>
                </Box>
            </Box>
        </Container>
  )
}

