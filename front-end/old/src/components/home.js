import React from 'react';
import './home.css'
import Account from "./account";
import ToDo from "./todo";
import {Navigate} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        const user = localStorage.getItem('user')
        this.state = {
            isLoadAcc : true,
            user: user ? JSON.parse(user) : null
        }
    }

    componentDidMount() {
        console.log('componentDidMount in Home.js')
    }
    componentWillUnmount() {
        console.log(' localStorage.clear()')
    }

    handleAccount = (event) => {
        this.setState({isLoadAcc: true})
    }

    handleTodo = (event) => {
        this.setState({isLoadAcc : false})
    }

    handleLogout = (event) => {
        localStorage.removeItem('user')
        this.setState({user: null})
    }

    render() {
        if (this.state.user) {
            return (
                <div id="home">
                    <div className="welcome">Hi, {this.state.user.name}
                    </div>
                    <div>
                        <div className="menu">
                            <ul>
                                <li onClick={this.handleAccount}> account</li>
                                <li onClick={this.handleTodo}> to-dos</li>
                                <li onClick={this.handleLogout}> logout</li>
                            </ul>
                        </div>
                        <div className="content">
                            {this.state.isLoadAcc ? <Account user={this.state.user}/> : <ToDo user={this.state.user}/>}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Navigate to="/login" replace={true} />
        }
    }

}
export default Home;