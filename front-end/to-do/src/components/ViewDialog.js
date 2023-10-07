import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import PaperComponent from './PaperComponent'
import { red } from '@mui/material/colors'

export default function ViewDialog({open, closeView, id, title, body}) {
    return (
        <Dialog 
            open={open} 
            onClose={closeView} 
            scroll='paper'
            maxWidth='sm' 
            fullWidth
            PaperComponent={PaperComponent}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogTitle style={{ cursor: 'move', display:'flex' }} id="draggable-dialog-title">
              <Avatar sx={{bgcolor:red[500]}} aria-label='todo'>{id}</Avatar>
              <Typography sx={{ml:1, lineHeight:'40px'}}>{title}</Typography>
            </DialogTitle>
            <DialogContent sx={{ maxHeight:'400px'}} dividers>
              <Typography sx={{wordWrap: "break-word"}}>
                 {body}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeView}>Close</Button>
            </DialogActions>
          </Dialog>
      )
}

