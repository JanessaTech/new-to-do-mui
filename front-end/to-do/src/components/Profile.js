import React from 'react'
import { Box, Button, Container, CssBaseline, FormHelperText, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';
import { VisibilityOff } from '@mui/icons-material';
import { UserContext } from './Home';
import axios from 'axios';



export default function Profile({
  register,
  formHandleSubmit,
  errors
}) {
  const user = React.useContext(UserContext)
  const [state, setState] = React.useState(
    {
      id: user.id,
      name: user.name,
      token: user.token,
      password: 'hidden001', // dummy password
      email: '',
      age: 20,
      errorMsg: '',
      emailDisabled: true,
      ageDisabled: true,
      buttonToggle: true
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
                  email: user.email
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
    console.log('new age', e.target.value)
    setState({
      ...state,
      age: e.target.value
    })
  }

  const handleModification = (e) => {
    e.preventDefault()
    setState(
      {
        ...state,
        buttonToggle: !state.buttonToggle,
        emailDisabled: false,
        ageDisabled: false
      }
    )
  }

  const handleUpdate = (data) => {
    console.log(data)

    axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
    const update = {
      id: data.id,
      password: data.password,
      name: data.name,
      email: data.email,
      age: data.age
    }
    let options = {};
        options = {
            url: 'http://127.0.0.1:3100/apis/v1/users',
            method: 'put',
            data: update
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
              })
            })
            .catch((error) => {
                console.log('error in axios of updateUser')
                console.log(error.response?.data)
                setState({
                  ...state,
                  errorMsg: error.response?.data?.message
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
      <Box component='form' onSubmit={formHandleSubmit(handleUpdate)} sx={{ mt: 3, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 1}
              }}>
          <Box sx={{height:50, mb:2}} color='red'>
                        {state.errorMsg}
          </Box>
          <TextField
              id='id'
              name='id'
              label='ID' 
              aria-label='id' 
              {...register('id')}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              color='primary'
              value={state.id}
              required
              fullWidth
              error={errors.id ? true: false}
              helperText={errors.id ? errors.id.message : " "}
          ></TextField>
          <TextField
              id='name'
              name='name'
              label='User Name' 
              aria-label='name' 
              value={state.name}
              {...register('name')}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              color='primary'
              required
              fullWidth
              error={errors.name ? true: false}
              helperText={errors.name ? errors.name.message : " "}
          ></TextField>
          <TextField
              id='password'
              name='password'
              label='Password' 
              aria-label='password' 
              {...register('password')}
              variant="outlined"
              color='primary'
              type='password'
              value={state.password}
              required
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment:(
                <InputAdornment position='end'>
                    <IconButton>
                      <VisibilityOff/>
                    </IconButton>
                </InputAdornment>) 
              }}
              error={errors.password ? true: false}
              helperText={errors.password ? errors.password.message : " "}
          ></TextField>
          <TextField
              label='Token' 
              variant="outlined"
              color='primary'
              value={state.token}
              required
              fullWidth
              multiline
              disabled
              helperText=" "
          ></TextField>
          <TextField
              id='email'
              name='email'
              label='Email' 
              aria-label='email'
              value={state.email}
              {...register('email')}
              variant="outlined"
              color='primary'
              fullWidth
              onChange={handleEmailChange}
              error={errors.email ? true: false}
              helperText={errors.email ? errors.email.message : " "}
              disabled={state.emailDisabled}
          ></TextField>
          
          <FormControl fullWidth disabled={state.ageDisabled}>
              <InputLabel id="age-select-label">Age</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="age-profile-select"
                  label="Age"
                  name='age'
                  value={state.age}
                  {...register('age')}
                  onChange={handleAgeChange}
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
          {state.buttonToggle ? <Button sx={sx.button} variant="contained" type="button" onClick={handleModification}>Modify</Button> :<Button sx={sx.button} variant="contained" type="submit">Update</Button>}
      </Box>
    </Container>
  )
}

