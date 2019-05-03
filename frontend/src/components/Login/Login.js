import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {submitLogin} from '../../actions/login.js';

class Login extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            guest_id: "",
            password: "",
            authFlag: false
        }

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        this.setState({
            authFlag: false
        })
    }

    onChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitLogin = (e) => 
    {
        e.preventDefault();

        const data = 
        {
            guest_id: this.state.guest_id,
            password: this.state.password
        }

        this.props.submitLogin(data);

        axios.defaults.withCredentials = true;
    }

    render()
    {
        let redirectVar = null;

        if (this.props.loginStateStore.resultAuth)
        {
            console.log("We get here right?");
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
                                <p>Please enter your Guest ID and password below:</p>
                            </div>

                            <div class = "form-group">
                                <input onChange = {this.onChange} type = "text" class = "form-control" name = "guest_id" placeholder = "Guest ID" required />
                            </div>

                            <div class = "form-group">
                                <input onChange = {this.onChange} type = "password" class = "form-control" name = "password" placeholder = "Password" required />
                            </div>

                            <button onClick = {this.submitLogin} class = "btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginStateStore: state.login
})

export default connect(mapStateToProps, {submitLogin})(Login);