import React, {Component} from 'react';
import {Navigate} from "react-router-dom";
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false,
            name : '',
            password: '',
            age: '',
            email: '',
            error: ''
        }
        this.handleClick = this.handleClick.bind()
        this.handleChange = this.handleChange.bind()
    }

    handleClick = (event) => {
        console.log('click signup button')
        const signup = {
            name : this.state.name,
            password : this.state.password,
            age: this.state.age,
            roles: ["user"],
            email : this.state.email
        }
        let options = {};
        options = {
            url: 'http://127.0.0.1:3100/apis/v1/users/register',
            method: 'post',
            data: signup
        }
        axios(options)
            .then((response) => {
                this.setState({redirect : true})
            })
            .catch((err) => {
                console.log(err.response.data)
                this.setState({error: err.response.data.message})
            })
    }
    handleChange = (event) => {
        console.log('The value of ' + [event.target.name] + " is changed to " + event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (
            <div>
                <h3 style={{color:'red'}}>{this.state.error}</h3>
                <form>
                    <label>User Name: </label>
                    <input name={"name"} placeholder={"Please input username"} onChange={this.handleChange}/>
                    <p/>
                    <label>Password: </label>
                    <input name={"password"} placeholder={"Please input password"} type={'password'} onChange={this.handleChange}/>
                    <p/>
                    <label>Age: </label> <input name={"age"} placeholder={"0"} onChange={this.handleChange}/>
                    <p/>
                    <label>Email: </label><input name={"email"} placeholder={"Please input address"} onChange={this.handleChange}/>
                    <p/>
                    <button type={"button"} onClick={this.handleClick} disabled={this.state.name && this.state.password ? '' : 'disabled'}>Signup</button>
                </form>
                {this.state.redirect && <Navigate to="/login" replace={true} />}
            </div>
        );
    }
}

export default Signup;