import { Divider, Fab} from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from './DeleteDialog'
import UpdateDialog from './UpdateDialog'
import ViewDialog from './ViewDialog'
import CustomCard from './CustomCard'
import AddDialog from './AddDialog';
import { UserContext } from './Home';
import axios from 'axios';

export default function Todo() {

  const user = React.useContext(UserContext)
  const [state, setState] = React.useState({
    userId: user.id,
    token: user.token,
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
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    console.log('start fetching fetchTodos info')
    axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
    let options = {
        url : `http://127.0.0.1:3100/apis/v1/todos/${state.userId}`,
        method: 'get'
    }
    axios(options)
        .then((response) => {
            let jsonTodos = response.data.data
            //console.log(jsonTodos)
            let todos = []
            for(let key in jsonTodos) {
                let value = jsonTodos[key]
                todos.push({id: value.id, title: value.title, body:value.body})
            }
            setState({
              ...state,
              todos: todos,
              isLoading: false
              }
            )
        })
        .catch((error) => {
          setState({
            ...state,
            error: error.response.data.message
          })
        })
}

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
    axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
    let options = {
        url : `http://127.0.0.1:3100/apis/v1/todos/${state.userId}/${state.toDelete}`,
        method: 'delete'
    }
    axios(options)
        .then((response)=>{
            let newTodos = []
            for (let todo of state.todos) {
                if (todo.id !== state.toDelete) {
                    newTodos.push(todo)
                }
            }
            setState({...state, todos : newTodos, deleteOpen : false})
        })
        .catch((error) => {
            setState({
                ...state,
                error: error.response.data.message,
                deleteOpen: false
            })
        })
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
    updateTodo(id, newTitle, newBody)
  }
  const updateTodo = (id, title, body)=>{
    console.log('start updating todo...')
        axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
        let todo = {
            user : state.userId,
            id: id,
            title : title,
            body: body
        }
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/todos/`,
            method: 'put',
            data:todo
        }
        axios(options)
            .then((response) => {
                let newTodos = []
                for(let todo of state.todos) {
                    if (todo.id !== state.id) {
                        newTodos.push(todo)
                    } else {
                        newTodos.push({id: id, title: title, body: body})
                    }
                }
                setState({...state, todos: newTodos, editOpen: false})
            })
            .catch((error) => {
                setState({
                    ...state,
                    error: error.response.data.message,
                    editOpen: false
                })
            })
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
    addTodo(newTitle, newBody)
  }
  const addTodo = (title, body) => {
    console.log('start adding todo...')
    console.log('token=', state.token)
    console.log('state.userId=', state.userId)
    axios.defaults.headers.common = {Authorization: `Bearer ${state.token}`}
        let todo =
            {
                user : state.userId,
                title : title,
                body : body
            }
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/todos/`,
            method: 'post',
            data: todo
        }
        axios(options)
            .then((response) => {
              console.log('run ok')
                console.log(response.data.data)
                let newTodos = []
                for(let todo of state.todos) {
                    newTodos.push(todo)
                }
                newTodos.push({id: response.data.data.id, title: title, body: body})
                setState({
                  ...state, 
                  todos: newTodos, 
                  addOpen: false
                })
            })
            .catch((error) => {
              console.log('run error')
                setState({
                    ...state,
                    error: error.response.data.message,
                    addOpen: false
                })
            })
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

