import React from 'react'
import { Box, Button, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import { UserContext } from './Home';
import axios from 'axios';

export default function Profile() {
  const user = React.useContext(UserContext)
  const [state, setState] = React.useState(
    {
      id: user.id,
      name: user.name,
      token: user.token,
      password: 'hidden001', // dummy password
      email: '',
      age: 20,
      inValidEmail: false,
      errorMsg: '',
      emailDisabled: true,
      ageDisabled: true,
      buttonToggle: true,
      isLoading: false
    }
  )

  useEffect(() => {
        console.log('start getting user info by id', state.id)
        axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/users/${state.id}`,
            method: 'get'
        }
        axios(options)
            .then((response) => {
                console.log('response.data.data in getUserById')
                console.log(response.data.data)
                let user = response.data.data
                setState({ 
                  ...state, 
                  age: user.age,
                  email: user.email,
                  isLoading: false
                })
            })
            .catch((error) => {
                console.log('error in axios of fetchAccount')
                console.log(error.response.data)
                setState({
                  ...state,
                  errorMsg: error.response.data.message
                })
            })
  }, [])

  const handleEmailChange = (e) => {
    e.preventDefault()
    setState({
      ...state,
      email: e.target.value
    })
  }
  const handleAgeChange = (e) => {
    e.preventDefault()
    setState({
      ...state,
      age: e.target.value
    })
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
      setState(
        {
          ...state,
          inValidEmail: false,
          errorMsg:''
        }
      )
    }
  }
  useEffect(() => validateEmail(), [state.email])

  const handleModification = (e) => {
    e.preventDefault()
    console.log(e.target.getAttribute('type'))
    e.target.setAttribute('type', 'submit')
    e.target.setAttribute('onClick', null)
    setState(
      {
        ...state,
        buttonToggle: !state.buttonToggle,
        emailDisabled: false,
        ageDisabled: false
      }
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (state.inValidEmail) return
    console.log(`id=${state.id}, userName=${state.name}, email=${state.email}, age=${state.age},`)

    axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
    const save = {
      id: state.id,
      name: state.name,
      email: state.email,
      age: state.age
    }
    let options = {};
        options = {
            url: 'http://127.0.0.1:3100/apis/v1/users',
            method: 'put',
            data: save
    }
    axios(options)
            .then((response) => {
              console.log('response.data.data in updateUser')
              console.log(response.data.data)
              let user = response.data.data
              setState({ 
                ...state, 
                age: user.age,
                name: user.name,
                email: user.email,
                buttonToggle: !state.buttonToggle,
                emailDisabled: true,
                ageDisabled: true,
                isLoading: false
              })
            })
            .catch((error) => {
                console.log('error in axios of updateUser')
                console.log(error.response.data)
                setState({
                  ...state,
                  errorMsg: error.response.data.message
                })
            })  
  }

  const sx = {
    button: {
      margin:'auto', 
      display:'block', 
      width:80
    }
  }

  return (
    <Container maxWidth='xs'>
      <CssBaseline/>
      <Box component='form' onSubmit={handleSave} sx={{ mt: 3, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 2}
              }}>
          <Box sx={{height:50, mb:2}} color='red'>
                        {state.errorMsg}
          </Box>
          <TextField
              label='ID' 
              variant="outlined"
              color='primary'
              value={state.id}
              required
              fullWidth
              disabled
          ></TextField>
          <TextField
              label='User Name' 
              variant="outlined"
              color='primary'
              value={state.name}
              required
              fullWidth
              disabled
          ></TextField>
          <TextField
              label='Password' 
              variant="outlined"
              color='primary'
              type='password'
              value={state.password}
              required
              fullWidth
              InputProps={{
                endAdornment:(
                <InputAdornment position='end'>
                    <IconButton>
                      <VisibilityOff/>
                    </IconButton>
                </InputAdornment>) 
              }}
              disabled={true}
          ></TextField>
          <TextField
              label='Email' 
              variant="outlined"
              color='primary'
              fullWidth
              type='email'
              value={state.email}
              error={state.inValidEmail}
              disabled={state.emailDisabled}
              onChange={handleEmailChange}
          ></TextField>
          <FormControl fullWidth disabled={state.ageDisabled}>
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
          {state.buttonToggle ? <Button sx={sx.button} variant="contained" type="button" onClick={handleModification}>Modify</Button> :<Button sx={sx.button} variant="contained" type="submit">Save</Button>}
      </Box>
    </Container>
  )
}

