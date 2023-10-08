import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import PaperComponent from './PaperComponent'

export default function DeleteDialog({open, cancelDelete, submitDelete, id}) {
    return (
        <Dialog 
            open={open} 
            onClose={cancelDelete} 
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
            <DialogContent sx={{ maxHeight:'400px'}} dividers>
             <Typography sx={{textAlign:'center'}}>Are you sure to delete?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete}>Cancel</Button>
              <Button onClick={submitDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
      )
}

