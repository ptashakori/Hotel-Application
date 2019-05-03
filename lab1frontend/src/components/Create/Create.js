import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
//import {RadioGroup, RadioButton} from 'react-radio-buttons';
//import cookie from 'react-cookies';
//import {Link} from 'react-router-dom';
//import {Redirect} from 'react-router';

class Create extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            name: "",
            email: "",
            password: "",
            role: ""
        }

        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.roleHandler = this.roleHandler.bind(this);
    }

    nameHandler = (e) => 
    {
        this.setState({
            name: e.target.value
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

    roleHandler = (e) => 
    {
        this.setState({
            role: e.target.value
        })
    }

    submitCreate = (e) =>
    {
        const data = 
        {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }

        axios.post('http://localhost:3001/create', data);
    }

    render()
    {
        return(
            <div class = "container">
                <div class = "login-form">
                    <div class = "main-div">
                        <div class = "panel">
                            <h2>Create a New User:</h2>
                            <p>Please enter your name, email and a password to set up a Canvas account:</p>
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.nameHandler} type = "text" class = "form-control" name = "name" placeholder = "Name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.emailHandler} type = "text" class = "form-control" name = "email" placeholder = "Email" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.passwordHandler} type = "password" class = "form-control" name = "password" placeholder = "Password" />
                        </div>

                        <br></br>

                        Please check whether you are a student or a part of our faculty:
                        <br></br>

                        <input type = "radio" name = "student" onChange = {this.roleHandler} value = "student"/>Student
                        <input type = "radio" name = "faculty" onChange = {this.roleHandler} value = "faculty"/>Faculty

                        <br></br>
                        <br></br>

                        <button onClick = {this.submitCreate} class = "btn btn-primary">Create User</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;