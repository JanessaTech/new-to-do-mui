import React from 'react'
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect } from 'react';

export default function Profile() {
  const [id, setId] = React.useState(1)
  const [userName, setUserName] = React.useState('Janessa Tech')
  const [email, setEmail] = React.useState('xx@gmail.com')
  const [inValidEmail, setInValidEmail] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('xxx')
  const [age, setAge] = React.useState(20)
  const [emailDisabled, setEmailDisabled] = React.useState(true)
  const [ageDisabled, setAgeDisabled]   = React.useState(true)
  const [buttonToggle, setButtonToggle] = React.useState(true)

  const handleEmailChange = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  }
  const handleAgeChange = (e) => {
    e.preventDefault()
    setAge(e.target.value)
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
  useEffect(() => validateEmail(), [email])

  const handleModification = (e) => {
    e.preventDefault()
    console.log(e.target.getAttribute('type'))
    e.target.setAttribute('type', 'submit')
    e.target.setAttribute('onClick', null)
    setEmailDisabled(false)
    setAgeDisabled(false)
    setButtonToggle(!buttonToggle)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (inValidEmail) return
    setButtonToggle(!buttonToggle)
    setEmailDisabled(true)
    setAgeDisabled(true)
    console.log(`id=${id}, userName=${userName}, email=${email}, age=${age}`)
  }

  return (
    <Container maxWidth='xs'>
      <CssBaseline/>
      <Box component='form' onSubmit={handleSave} sx={{ mt: 0, width:1,
                    '& .MuiTextField-root,& .MuiFormControl-root': {
                    mb: 2}
              }}>
          <Box sx={{height:50, mb:2}} color='red'>
                        {errorMsg}
          </Box>
          <TextField
              label='ID' 
              variant="outlined"
              color='primary'
              value={id}
              required
              fullWidth
              disabled
          ></TextField>
          <TextField
              label='User Name' 
              variant="outlined"
              color='primary'
              value={userName}
              required
              fullWidth
              disabled
          ></TextField>
          <TextField
              label='Email' 
              variant="outlined"
              color='primary'
              fullWidth
              type='email'
              value={email}
              error={inValidEmail}
              disabled={emailDisabled}
              onChange={handleEmailChange}
          ></TextField>
          <FormControl fullWidth disabled={ageDisabled}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleAgeChange}
              >
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                  <MenuItem value={40}>Forty</MenuItem>
                  <MenuItem value={50}>Fifty</MenuItem>
              </Select>
          </FormControl>
          {buttonToggle ? <Button sx={{margin:'auto', display:'block', width:80}} variant="contained" type="button" onClick={handleModification}>Modify</Button> :<Button sx={{margin:'auto', display:'block', width:80}} variant="contained" type="submit">Save</Button>}
      </Box>
    </Container>
  )
}

