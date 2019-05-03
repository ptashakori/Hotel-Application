import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Login extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            email: "",
            password: "",
            authFlag: false
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount(){
        this.setState({
            authFlag: false
        })
    }

    emailHandler = (e) =>
    {
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) =>
    {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) =>
    {
        //var headers = new Headers();

        e.preventDefault();

        const data = 
        {
            email: this.state.email,
            password: this.state.password
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/profile', data);

        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status code: ", response.status);

                if (response.status === 200){
                    this.setState({
                        authFlag: true
                    })
                }
                else{
                    this.setState({
                        authFlag: false
                    })
                }
            });
        
    }

    render()
    {
        let redirectVar = null;

        if (cookie.load('cookie'))
        {
            redirectVar = <Redirect to = "/home" />
        }

        return(
            <div>
                {redirectVar}

            <div class = "container">
                <div class = "login-form">
                    <div class = "main-div">
                        <div class = "panel">
                            <h2>Login:</h2>
                            <p>Please enter your Canvas email and password:</p>
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.emailHandler} type = "text" class = "form-control" name = "email" placeholder = "Email" required />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.passwordHandler} type = "password" class = "form-control" name = "password" placeholder = "Password" required/>
                        </div>

                        <button onClick = {this.submitLogin} class = "btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Login;