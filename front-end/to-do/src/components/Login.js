import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({
        register,
        formHandleSubmit,
        errors
    }) {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        name: '',
        showPassword: false,
        errorMsg: ''
    })

    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setState({
            ...state,
            showPassword: !state.showPassword
        })
    }

    const handleLogin = (data) => {
        console.log(data)
        
        const login = {
            name : data.name,
            password: data.password
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
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/home')
            })
            .catch((err) => {
                console.log(err.response?.data)
                setState({...state, errorMsg: err.response?.data?.message || 'Please signup first'})
            })
    }

  return (
    <Container maxWidth='xs'>
        <CssBaseline/>
        <Box sx={{display: 'flex'}}>
            <Box component='form' onSubmit={formHandleSubmit(handleLogin)}
                sx={{ mt: 20, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 1
                } 
            }} noValidate autoComplete='off'>
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
                                        {state.showPassword ? <Visibility />: <VisibilityOff/> }
                                    </IconButton>
                                </InputAdornment>}
                            />
                            <FormHelperText id="password-helper-text">
                                {errors.password ? errors.password.message : " "}
                            </FormHelperText>
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