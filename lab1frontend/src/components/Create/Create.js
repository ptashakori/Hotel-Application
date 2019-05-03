import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

class Create extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            guest_id: "",
            firstname: "",
            lastname: "",
            phone_number: "",
            password: ""
        }

        this.guest_idHandler = this.guest_idHandler.bind(this);
        this.firstname_Handler = this.firstname_Handler.bind(this);
        this.lastname_Handler = this.lastname_Handler.bind(this);
        this.phone_numberHandler = this.phone_numberHandler.bind(this);
        this.password_Handler = this.password_Handler.bind(this);

        this.submitCreate = this.submitCreate.bind(this);
    }

    guest_idHandler = (e) => 
    {
        this.setState({
            guest_id: e.target.value
        })
    }

    firstname_Handler = (e) => 
    {
        this.setState({
            firstname: e.target.value
        })
    }

    lastname_Handler = (e) => 
    {
        this.setState({
            lastname: e.target.value
        })
    }

    phone_numberHandler = (e) => 
    {
        this.setState({
            phone_number: e.target.value
        })
    }

    password_Handler = (e) => 
    {
        this.setState({
            password: e.target.value
        })
    }

    submitCreate = (e) =>
    {
        const data = 
        {
            guest_id: this.state.guest_id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone_number: this.state.phone_number,
            password: this.state.password
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
                            <h2>Create a New Guest Account:</h2>
                            <p>Please enter your Guest ID, first name, last name, phone number and a password to set up an account:</p>
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.guest_idHandler} type = "text" class = "form-control" name = "guest_id" placeholder = "Guest ID" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.firstname_Handler} type = "text" class = "form-control" name = "firstname" placeholder = "First name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.lastname_Handler} type = "text" class = "form-control" name = "lastname" placeholder = "Last name" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.phone_numberHandler} type = "text" class = "form-control" name = "phone_number" placeholder = "Phone number" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.password_Handler} type = "password" class = "form-control" name = "password" placeholder = "Password" />
                        </div>

                        <br></br>

                        <button onClick = {this.submitCreate} class = "btn btn-primary">Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;