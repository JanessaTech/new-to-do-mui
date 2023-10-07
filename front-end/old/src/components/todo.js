import React from 'react';
import Dialog from 'rc-dialog'
import 'rc-dialog/assets/index.css';
import axios from "axios";

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : props.user.id,
            name : props.user.name,
            token: props.user.token,
            todos : [
            ],
            viewOpen : false,
            addOpen: false,
            editOpen: false,
            deleteOpen : false,
            id: '',
            title: '',
            body: '',
            error: '',
            isLoading: true,
        }
    }

    componentDidMount = () => {
        this.fetchTodos()
    }

    fetchTodos() {
        console.log('start fetching fetchTodos info')
        axios.defaults.headers.common = {Authorization: `Bearer ${this.state.token}`}
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/todos/${this.state.user}`,
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
                this.setState({
                    todos: todos,
                    isLoading: false
                    }
                )
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.message
                })
            })
    }

    handleView = (e, key) => {
        this.setState({viewOpen: true})
        console.log(`key=${key}`)
        const found = this.state.todos.filter((a) => a.id === key)[0]
        console.log(found)
        this.setState({id: found.id, title: found.title, body: found.body})
    }

    handleAdd = (e) => {
        this.setState({addOpen: true})
    }

    handleEdit = (e, key) => {
        this.setState({editOpen: true})
        const found = this.state.todos.filter((a) => a.id === key)[0]
        console.log(found)
        this.setState({id : found.id, title: found.title, body: found.body})
    }

    handleDelete = (e, key) => {
        this.setState({deleteOpen: true, toDelete: key})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(`e.target.name is changed to ${e.target.value}`)
    }

    submitEdit = (e) => {
        console.log('submit changes after editing')
        this.updateTodo()
    }

    submitAdd = (e) => {
        console.log('submit changes after adding')
        this.addTodo()
    }

    updateTodo() {
        console.log('start updating todo...')
        axios.defaults.headers.common = {Authorization: `Bearer ${this.state.token}`}
        let todo = {
            "user" : this.state.user,
            "id": this.state.id,
            "title" : this.state.title,
            "body": this.state.body
        }
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/todos/`,
            method: 'put',
            data:todo
        }
        axios(options)
            .then((response) => {
                let newTodos = []
                for(let todo of this.state.todos) {
                    if (todo.id !== this.state.id) {
                        newTodos.push(todo)
                    } else {
                        newTodos.push({id: this.state.id, title: this.state.title, body: this.state.body})
                    }
                }
                this.setState({todos: newTodos, editOpen: false})
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.message,
                    editOpen: false
                })
            })
    }

    addTodo() {
        console.log('start creating a new todo...')
        axios.defaults.headers.common = {Authorization: `Bearer ${this.state.token}`}
        let todo =
            {
                "user" : this.state.user,
                "title" : this.state.title,
                "body": this.state.body
            }
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/todos/`,
            method: 'post',
            data: todo
        }
        axios(options)
            .then((response) => {
                console.log(response.data.data)
                let newTodos = []
                for(let todo of this.state.todos) {
                    newTodos.push(todo)
                }
                newTodos.push({id: response.data.data.id, title: this.state.title, body: this.state.body})
                this.setState({todos: newTodos, addOpen: false})
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.message,
                    addOpen: false
                })
            })
    }

    deleteTodo() {
        console.log('start deleting todo...')
        axios.defaults.headers.common = {Authorization: `Bearer ${this.state.token}`}
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/todos/${this.state.user}/${this.state.toDelete}`,
            method: 'delete'
        }
        axios(options)
            .then((response)=>{
                let newTodos = []
                for (let todo of this.state.todos) {
                    if (todo.id !== this.state.toDelete) {
                        newTodos.push(todo)
                    }
                }
                this.setState({todos : newTodos, deleteOpen : false})
            })
            .catch((error) => {
                this.setState({
                    error: error.response.data.message,
                    deleteOpen: false
                })
            })

    }



    submitDelete = (e) => {
        console.log(`todo #${this.state.toDelete} will be deleted`)
        this.deleteTodo()
    }

    cancelDelete = () => {
        this.setState({deleteOpen : false})
    }
    closeView = (e) => {
        this.setState({viewOpen: false})
    }
    closeAdd = (e) => {
        this.setState({addOpen: false})
    }
    closeEdit = (e) => {
        this.setState({editOpen: false})
    }
    closeDelete = (e) => {
        this.setState({deleteOpen: false})
    }
    render() {
        const viewDialog =
            <Dialog
                visible={this.state.viewOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeView}
                forceRender
                style={{width:600}}>
                <h1>View Todo modal</h1>
                <label>Id</label> : <span>{this.state.id}</span>
                <p/>
                <label>Title</label> : <span>{this.state.title}</span>
                <p/>
                <label>Body</label> : <span>{this.state.body}</span>

            </Dialog>
        const editDialog =
            <Dialog
                visible={this.state.editOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeEdit}
                forceRender
                style={{width:600}}>
                <h1>Edit Todo modal</h1>
                <label>Id</label> : <span>{this.state.id}</span>
                <p/>
                <label>Title</label> : <input name = 'title' value={this.state.title} onChange={this.handleChange}/>
                <p/>
                <label>Body</label> : <input name = 'body' value={this.state.body} onChange={this.handleChange}/>
                <p/>
                <button onClick={this.submitEdit}>Modify</button>
            </Dialog>
        const addDialog =
            <Dialog
                visible={this.state.addOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeAdd}
                forceRender
                style={{width:600}}>
                <h1>Add Todo modal</h1>
                <label>Title</label> : <input name = 'title' value={this.state.title} onChange={this.handleChange}/>
                <p/>
                <label>Body</label> : <input name = 'body' value={this.state.body} onChange={this.handleChange}/>
                <p/>
                <button onClick={this.submitAdd}>Add</button>
            </Dialog>
        const deleteDialog =
            <Dialog
                visible={this.state.deleteOpen}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.closeDelete}
                forceRender
                style={{width:600}}>
                <h1>Delete #{this.state.toDelete}Todo modal</h1>
                <button onClick={this.submitDelete}>Delete</button> <button onClick={this.cancelDelete}>Cancel</button>
            </Dialog>


        return (
            <div id="todo">
                <div className="error">{this.state.error}</div>
                {this.state.isLoading && <div className="loading">Loading</div>}
                <div id="add"><a href="#" onClick={this.handleAdd}><img width="20"  height="20" src="images/add.svg" alt="Add todo"/></a></div>
                {!this.state.isLoading &&
                    <ul>
                    {
                        this.state.todos.map((todo) => (
                            <li key={todo.id}><span>#{todo.id}</span>&nbsp;&nbsp; <span>{todo.title}</span> <a href="#" onClick={(e) => this.handleView(e, todo.id)}>view</a>&nbsp;&nbsp;<a href="#" onClick={(e) => this.handleEdit(e, todo.id)}>edit</a>&nbsp;&nbsp;<a href="#" onClick={ (e) => this.handleDelete(e, todo.id)}>delete</a></li>
                        ))
                    }
                    </ul>
                }
                {viewDialog}
                {addDialog}
                {editDialog}
                {deleteDialog}
            </div>
        )
    }
}

export default ToDo