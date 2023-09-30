import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isInvalidPassword, setIsInvalidPassword] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')


    const handleClickShowPassword = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSumbit')
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
            <Box component='form' onSubmit={handleSubmit}
                sx={{ mt: 20, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 2
                } 
            }}>
                <Box sx={{height:50, mb:2}} color='red'>
                    {errorMsg}
                </Box>
                <TextField
                    label='User Name' 
                    variant="outlined"
                    color='primary'
                    fullWidth
                    required
                ></TextField>
                <FormControl variant="outlined" fullWidth color='primary' required error={isInvalidPassword}>
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