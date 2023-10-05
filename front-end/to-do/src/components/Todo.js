import { Fab} from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from './DeleteDialog'
import UpdateDialog from './UpdateDialog'
import ViewDialog from './ViewDialog'
import CustomCard from './CustomCard'
import AddDialog from './AddDialog';

export default function Todo() {
  const [state, setState] = React.useState({
    todos : [
    ],
    viewOpen : false,
    addOpen: false,
    editOpen: false,
    deleteOpen : false,
    id: '',
    title: 'xdxdxd',
    body: '',
    error: '',
    toDelete: '',
    isLoading: true,
  })
  useEffect(() => {
    let newTodos = [
      {id: 1, title: 'todo1', body: 'aaaaa'},
      {id: 2, title: 'todo2', body: 'bbbbb'},
      {id: 3, title: 'todo3', body: 'ccccc'},
      {id: 4, title: 'todo4', body: 'ddddd'},
      {id: 5, title: 'todo5', body: 'eeeee'},
      {id: 6, title: 'todo6', body: 'fffff'},
      {id: 7, title: 'todo7', body: 'ggggg'},
      {id: 8, title: 'todo8', body: 'hhhhh'},
      {id: 9, title: 'todo9', body: 'iiiii'},
    ]
    /*
    setState(previousState => {
      return {...previousState, todos:newTodos}
    })
    The code above is the same as setState({...state, todos:newTodos})
    */
    setState({...state, todos:newTodos})
  }, [])

  const handleView = (e, id) => {
    e.preventDefault()
    console.log(`View ${id}`)
    const found = state.todos.filter((a) => a.id === id)[0]
    //console.log(found)
    setState({...state, viewOpen: true, id: found.id, title: found.title, body: found.body})
  }
  const closeView = (e) => {
    e.preventDefault()
    setState({...state, viewOpen: false})
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    //console.log(`delete ${id}`)
    setState({...state, deleteOpen: true, toDelete: id})
  }
  const cancelDelete = () => {
    setState({...state, deleteOpen : false})
  }
  const submitDelete = (e) => {
    console.log(`todo #${state.toDelete} will be deleted`)
    deleteTodo()
  }
  const deleteTodo = () => {
    console.log('start deleting todo...')
  }



  const handleUpdate = (e, id) => {
    e.preventDefault()
    const found = state.todos.filter((a) => a.id === id)[0]
    console.log(found)
    setState({...state, id: found.id, title: found.title, body: found.body, editOpen: true})
  }
  const cancelUpdate = () => {
    setState({...state, editOpen : false})
  }
  const submitEdit = (e, id, newTitle, newBody) => {
    console.log('submit changes after editing')
    console.log(`id=${id}`)
    console.log(`newTitle=${newTitle}`)
    console.log(`newBody=${newBody}`)
    updateTodo()
  }
  const updateTodo = ()=>{
    console.log('start updating todo...')
  }

  const handleAdd = (e)=> {
    e.preventDefault()
    setState({...state, addOpen:true})
  }
  const cancleAdd = () => {
    setState({...state, addOpen : false})
  }
  const submitAdd = (e, newTitle, newBody) => {
    console.log('submit changes after adding')
    console.log(`newTitle=${newTitle}`)
    console.log(`newBody=${newBody}`)
    addTodo()
  }
  const addTodo = () => {
    console.log('start adding todo...')
  }

  return (
    <Container>
      <Fab sx={{position:'fixed', bottom:200, right:20}} color="primary" aria-label="add" onClick={handleAdd}>
        <AddIcon/>
      </Fab>
      <Box sx={{mt: 2, display:'flex', flexWrap:'wrap'}}>
        {
          state.todos.map( (todo) => (
            <CustomCard key={todo.id} id={todo.id} title={todo.title} body={todo.body} handleView={handleView} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
          ))
        }
      </Box>
      <ViewDialog open={state.viewOpen} closeView={closeView} id={state.id} title={state.title} body={state.body}/>
      <DeleteDialog open={state.deleteOpen} cancelDelete={cancelDelete} submitDelete={submitDelete} id={state.toDelete}/>
      {state.editOpen &&  <UpdateDialog open={state.editOpen} cancelUpdate={cancelUpdate} submitEdit={submitEdit} id={state.id} title={state.title} body={state.body}/>}
      {state.addOpen && <AddDialog open={state.addOpen} cancleAdd={cancleAdd} submitAdd={submitAdd}/>}
    </Container>
  )
}

