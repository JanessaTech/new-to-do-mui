import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import PaperComponent from './PaperComponent'
import { red } from '@mui/material/colors'

export default function AddDialog({
    register, 
    formHandleSubmit, 
    errors, 
    open, 
    cancleAdd, 
    submitAdd, 
    user}) {

    const [state, setState] = React.useState({
        user: user,
        title: '',
        body: ''
    })

    const handleTitleChange = (e) => {
        e.preventDefault()
        setState({...state, title: e.target.value})
    }

    const handleBodyChange = (e) => {
        e.preventDefault()
        setState({...state, body:e.target.value})    
    }

    const submitNew = (data) => {
        console.log(data)
        submitAdd(state.title, state.body)
    }

    return (
        <Dialog 
            open={open} 
            onClose={cancleAdd} 
            scroll='paper'
            maxWidth='sm' 
            fullWidth
            PaperComponent={PaperComponent}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle style={{ cursor: 'move', display:'flex' }} id="draggable-dialog-title">
              <Avatar sx={{bgcolor:red[500]}} aria-label='todo'>{'NA'}</Avatar>
              <Typography sx={{ml:1, lineHeight:'40px'}}></Typography>
            </DialogTitle>
            <Box component='form' onSubmit={formHandleSubmit(submitNew)} 
                sx={{ '& .MuiTextField-root': {mb:1}}} 
                noValidate autoComplete='off'>
                <DialogContent dividers>
                    <input
                        id='user'
                        label='user' 
                        name='user'
                        aria-label='user' 
                        value={state.user}
                        {...register('user')}
                        type="hidden"
                    />
                    <TextField
                        id='title'
                        label='Title' 
                        name='title'
                        aria-label='title' 
                        value={state.title}
                        {...register('title')}
                        variant="outlined"
                        color='primary'
                        fullWidth
                        required
                        onChange={handleTitleChange}
                        error={errors.title ? true: false}
                        helperText={errors.title ? errors.title.message : " "}
                    />
                    <TextField
                        id='body'
                        label='Body' 
                        name='body'
                        aria-label='body' 
                        value={state.body}
                        {...register('body')}
                        variant="outlined"
                        color='primary'
                        multiline
                        fullWidth
                        required
                        onChange={handleBodyChange}
                        error={errors.body ? true: false}
                        helperText={errors.body ? errors.body.message : " "}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={cancleAdd}>Cancel</Button>
                <Button type="submit">Add</Button>
                </DialogActions>
            </Box>
        </Dialog>
      )
}

