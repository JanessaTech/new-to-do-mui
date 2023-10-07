import React from 'react';
import axios from "axios";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.user.id,
            name : props.user.name,
            token: props.user.token,
            password : '',
            age : '',
            email : '',
            isLoading: true,
            error: ''
        }
    }

    componentDidMount = () => {
        console.log('request data from server')
        this.fetchAccount()
    }

    fetchAccount() {
        console.log('start fetching account info')
        axios.defaults.headers.common = {Authorization: `Bearer ${this.state.token}`}
        let options = {
            url : `http://127.0.0.1:3100/apis/v1/users/${this.state.id}`,
            method: 'get'
        }
        axios(options)
            .then((response) => {
                console.log('response.data.data in fetchAccount')
                console.log(response.data.data)
                let user = response.data.data
                this.setState({
                    id : user.id,
                    name: user.name,
                    password: 'dummy',
                    age: user.age,
                    email: user.email,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log('error in axios of fetchAccount')
                console.log(error.response.data)
                this.setState({
                    error: error.response.data.message
                })
            })
    }

    handleChange = (event) => {
        console.log('click field ' + [event.target.name] + ', new value is ' + event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Click submit')
        const data = {
            id : this.state.id,
            name : this.state.name,
            password : this.state.password,
            age : this.state.age,
            addr : this.state.addr
        }
        console.log(data)
        localStorage.setItem('user', JSON.stringify(data))
    }

    render() {
        return (
            <div id="acc">
                <div className="error">{this.state.error}</div>
                {this.state.isLoading && <div className="loading">Loading</div>}
                {
                    !this.state.isLoading &&
                    <form onSubmit={this.handleSubmit}>
                        <label> ID : </label> <input name="id" readOnly={true} value={this.state.id}/>
                        <p/>
                        <label>User Name: </label> <input name="name" value={this.state.name} readOnly={true}/>
                        <p/>
                        <label>Password: </label> <input name="password" value={this.state.password} type={"password"} onChange={this.handleChange}/>
                        <p/>
                        <label>Age: </label><input name="age" value={this.state.age} onChange={this.handleChange}/>
                        <p/>
                        <label>Email: </label><input name="email" value={this.state.email} onChange={this.handleChange}/>
                        <p/>
                        <button type="submit" disabled={this.state.name && this.state.password ? '' : 'disabled'}>Modify</button>
                    </form>
                }
            </div>
        );
    }
}

export default Account