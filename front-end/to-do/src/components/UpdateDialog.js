import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import PaperComponent from './PaperComponent'
import { red } from '@mui/material/colors'

export default function UpdateDialog({open, cancelUpdate, submitEdit, id, title, body}) {
    const [internalTitle, setInternalTitle] = React.useState(title)
    const [isTitleInvalid, setIsTitleInvalid] = React.useState(false)
    const [internalBody, setInternalBody] = React.useState(body)
    const [isBodyInvalid, setIsBodyInvalid] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')

    const handleTitleChange = (e) => {
        e.preventDefault()
        setInternalTitle(e.target.value)
        if(e.target.value.length > 20) {
            setErrMsg('The length of the title should not be more than 20 characters ')
            setIsTitleInvalid(true)
        }else if(e.target.value.length === 0){
            setErrMsg('Title cannot be empty')
            setIsTitleInvalid(true)
        } else {
            setInternalTitle(e.target.value)
            setErrMsg('')
            setIsTitleInvalid(false)
        }
    }

    const handleBodyChange = (e) => {
        e.preventDefault()
        //console.log(e.target.value)
        setInternalBody(e.target.value) 
        if (e.target.value.length === 0) {
            setErrMsg('Body cannot be empty')
            setIsBodyInvalid(true)
        }else {    
            setErrMsg('')
            setIsBodyInvalid(false)
        }
    }

    const submitUpdateInDialog = (e) => {
        e.preventDefault(e)
        if (isTitleInvalid) return
        if (!internalTitle || internalTitle.length === 0) {
            setErrMsg('Title cannot be empty')
            setIsTitleInvalid(true)
            return
        }
        if (!internalBody || internalBody.length === 0) {
            setErrMsg('Body cannot be empty')
            setIsBodyInvalid(true)
            return
        }
        submitEdit(e, id, internalTitle, internalBody)
    }

    return (
        <Dialog 
            open={open} 
            onClose={cancelUpdate} 
            scroll='paper'
            maxWidth='sm' 
            fullWidth
            PaperComponent={PaperComponent}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle style={{ cursor: 'move', display:'flex' }} id="draggable-dialog-title">
              <Avatar sx={{bgcolor:red[500]}} aria-label='todo'>{id}</Avatar>
              <Typography sx={{ml:1, lineHeight:'40px'}}></Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ '& .MuiTextField-root': {mb:2}}}>
                <Box sx={{height:30, mb:2}} color='red'>
                  <Typography>{errMsg}</Typography>     
                </Box>
                <TextField
                    label='Title' 
                    value={internalTitle}
                    variant="outlined"
                    color='primary'
                    error={isTitleInvalid}
                    fullWidth
                    required
                    onChange={handleTitleChange}
                />
                <TextField
                    label='Body' 
                    value={internalBody}
                    variant="outlined"
                    color='primary'
                    error={isBodyInvalid}
                    multiline
                    fullWidth
                    required
                    onChange={handleBodyChange}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelUpdate}>Cancel</Button>
              <Button onClick={(e) => submitUpdateInDialog(e)}>Update</Button>
            </DialogActions>
        </Dialog>
      )
}

