import { Avatar, Card, CardActions, CardContent, CardHeader, Fab, IconButton, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { red, grey } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

function CustomCard(props) {
  const {id, content} = props
  const [body, setBody] = React.useState(content)

  const handleDelete = (e, id) => {
    e.preventDefault()
    console.log(`delete ${id}`)
  }

  const handleUpdate = (e, id) => {
    e.preventDefault()
    console.log(`update ${id}`)
  }

  const handleView = (e, id) => {
    e.preventDefault()
    console.log(`View ${id}`)
  }

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
            title='todo1'
            > 
          </CardHeader>
          <CardContent sx={{height:160, overflow:'hidden'}}>
              <Typography>
             {content}
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

export default function Todo() {
  return (
    <Container>
      <Fab sx={{position:'fixed', bottom:200, right:20}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Box sx={{mt: 2, display:'flex', flexWrap:'wrap'}}>
        <CustomCard id={1} content={'aaaaa'}/>
        <CustomCard id={2} content={'bbbbb'}/>
        <CustomCard id={3} content={'ccccc'}/>
        <CustomCard id={4} content={'ddddd'}/>
        <CustomCard id={5} content={'eeeee'}/>
        <CustomCard id={6} content={'fffff'}/>
        <CustomCard id={7} content={'ggggg'}/>
        <CustomCard id={8} content={'hhhhh'}/>
        <CustomCard id={9} content={'iiiii'}/>
        <CustomCard id={10} content={'jjjjj'}/>
        <CustomCard id={11} content={'kkkkk'}/>
        <CustomCard id={12} content={'lllll'}/>
      </Box>
    </Container>
  )
}

