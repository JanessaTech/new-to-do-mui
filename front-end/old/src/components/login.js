import React from 'react';
import { Navigate } from "react-router-dom";
import {
    Link
} from 'react-router-dom'
import axios from "axios";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth : false,
            name : '',
            password: '',
            error : ''
        }
        this.handleSubmit = this.handleSubmit.bind()
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log('click login button')
        //const user = localStorage.getItem('user')
        const login = {
            name : this.state.name,
            password: this.state.password
        }
        let options = {};
        options = {
            url: 'http://127.0.0.1:3100/apis/v1/users/login',
            method: 'post',
            data: login
        }
        axios(options)
            .then((response) => {
                const user = response.data.data
                console.log('login ok')
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({ isAuth : true,})
            })
            .catch((err) => {
                console.log('login error')
                console.log(err.response.data)
                this.setState({
                    error: err.response.data.message || 'Please signup first'
                })
            })
    }

    handleChange = (event) =>{
        console.log('The value of ' + [event.target.name] + " is changed to " + event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error && <h2>{this.state.error}</h2>
                    }
                    <label>User Name: </label>
                    <input name={"name"} onChange={this.handleChange}/>
                    <p/>
                    <label>Password: </label>
                    <input type={"password"} name={"password"} onChange={this.handleChange}/>
                    <p/>
                    <button type={'submit'}>Login</button>   <Link to='/signup'>SignUp</Link>
                </form>

                {this.state.isAuth && <Navigate to="/" replace={true} />}
            </div>
        )
    }
}
export default Login;