import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function Signup({
    register,
    formHandleSubmit,
    errors
  }) {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        showPassword: false,
        showPasswordConfirm: false,
        errorMsg: '',
        age: 20
    })

    const handleSignup = (data) => {
        console.log(data)

        const signup = {
            name : data.name,
            password : data.password,
            age: data.age,
            roles: ["user"],
            email : data.email
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
                console.log(err.response?.data)
                setState({
                    ...state,
                    errorMsg: err.response?.data?.message
                })
            })
    }

    const handleAgeChange = e => {
        e.preventDefault()
        setState({...state, age: e.target.value});
    }

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setState({
            ...state,
            showPassword: !state.showPassword
        })
    }
    const handleClickShowPasswordConfirm = (e) => {
        e.preventDefault()
        setState({
            ...state,
            showPasswordConfirm: !state.showPasswordConfirm
        })
    }

    return (
        <Container maxWidth='xs'>
            <CssBaseline/>
            <Box sx={{display: 'flex'}}>
                <Box component='form' onSubmit={formHandleSubmit(handleSignup)}
                sx={{ mt: 20, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 1
                    } 
                  }}
                noValidate autoComplete='off'
                >
                    <Box sx={{height:50, mb:2}} color='red'>
                        {state.errorMsg}
                    </Box>
                    <TextField
                        id='name'
                        name='name'
                        label='User Name' 
                        aria-label='User Name' 
                        {...register('name')}
                        variant="outlined"
                        color='primary'
                        fullWidth
                        required
                        error={errors.name ? true: false}
                        helperText={errors.name ? errors.name.message : " "}
                    ></TextField>
                    <FormControl variant="outlined" fullWidth color='primary' required error={errors.password ? true: false}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id='password' 
                            name="password"
                            aria-label='toggle password visibility'
                            label='Password'
                            {...register('password')}
                            type={state.showPassword ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPassword}>
                                        {state.showPassword ?  <Visibility />: <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>}
                            />
                            <FormHelperText id="password-helper-text">
                                {errors.password ? errors.password.message : " "}
                            </FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth color='primary' required error={errors.passwordConfirm ? true: false}>
                        <InputLabel htmlFor="outlined-adornment-passwordConfirm">Confirm Password</InputLabel>
                        <OutlinedInput
                            id='passwordConfirm' 
                            name='passwordConfirm'
                            label='Confirm Password'
                            aria-label='toggle passwordConfirm visibility'
                            {...register('passwordConfirm')}
                            type={state.showPasswordConfirm ? 'text': 'password'}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClickShowPasswordConfirm}>
                                        {state.showPasswordConfirm ? <Visibility /> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>}
                            />
                            <FormHelperText id="passwordConfirm-helper-text">
                                {errors.passwordConfirm ? errors.passwordConfirm.message : " "}
                            </FormHelperText>
                    </FormControl>
                    <TextField
                        id='email'
                        name='email'
                        label='Email' 
                        aria-label='email'
                        {...register('email')}
                        type='email'
                        variant="outlined"
                        color='primary'
                        fullWidth
                        error={errors.email ? true: false}
                        helperText={errors.email ? errors.email.message : " "}
                    ></TextField>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="age-signup-select"
                            label="Age"
                            name='age'
                            value={state.age}
                            {...register('age')}
                            onChange={handleAgeChange}
                            error={errors.age ? true: false}
                        >
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            <MenuItem value={40}>Forty</MenuItem>
                            <MenuItem value={50}>Fifty</MenuItem>
                        </Select>
                        <FormHelperText id="age-helper-text">
                                {errors.age ? errors.age.message : " "}
                        </FormHelperText>
                    </FormControl>
                    <Button variant="contained" type="submit">Signup</Button>
                </Box>
            </Box>
        </Container>
  )
}

