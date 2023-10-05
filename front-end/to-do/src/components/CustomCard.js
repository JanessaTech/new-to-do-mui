import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import { red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function CustomCard({id, title, body, handleView, handleDelete, handleUpdate}) {
    return (
        <Card sx={{width:300, height:300, mb:2, mr:2}} elevation={10}>
              <CardHeader
                avatar={
                  <Avatar sx={{bgcolor:red[500]}} aria-label='todo'>{id}</Avatar>
                }
                action={
                  <IconButton aria-label="settings" onClick={ (e)=> handleDelete(e, id)}>
                    <DeleteIcon/>
                  </IconButton>
                }
                title={title}
                > 
              </CardHeader>
              <CardContent sx={{height:160, overflow:'hidden'}}>
                  <Typography>
                 {body}
                  </Typography>
                </CardContent>
                <CardActions >
                  <IconButton sx={{marginLeft:'auto'}} aria-label='Update todo' onClick={ (e) => handleUpdate(e, id)}>
                    <UpdateIcon/>
                  </IconButton>
                  <IconButton aria-label='View todo' onClick={(e) => handleView(e, id)}>
                    <VisibilityIcon/>
                  </IconButton>
                </CardActions>
            </Card>
      )
}

