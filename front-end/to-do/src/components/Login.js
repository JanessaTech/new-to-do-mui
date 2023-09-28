import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material';

class Login extends React.Component {
    
    render() {
        return (
            <Container sx={{width:300}}>
                <CssBaseline/>
                <Box sx={{
                    display: 'flex'

                }}>
                    <Box component='form' noValidate sx={{ mt: 1, width:'100%'}}>
                        <TextField
                          label='Note title' 
                          variant="outlined"
                          color='primary'
                          fullWidth
                          required
                        ></TextField>
                    </Box>
                    
                </Box>
            </Container>
            
        )
    }
}
export default Login;