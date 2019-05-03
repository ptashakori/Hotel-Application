import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {submitempLogin} from '../../actions/emplogin.js';

class empLogin extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            emp_id: "",
            emp_password: "",
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
            emp_id: this.state.emp_id,
            emp_password: this.state.emp_password
        }

        this.props.submitempLogin(data);

        axios.defaults.withCredentials = true;
    }

    render()
    {
        let redirectVar = null;

        if (this.props.empLoginStateStore.resultAuth)
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
                                <p>Please enter your Employee ID and password below:</p>
                            </div>

                            <div class = "form-group">
                                <input onChange = {this.onChange} type = "text" class = "form-control" name = "emp_id" placeholder = "Employee ID" required />
                            </div>

                            <div class = "form-group">
                                <input onChange = {this.onChange} type = "password" class = "form-control" name = "emp_password" placeholder = "Password" required />
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
    empLoginStateStore: state.emplogin
})

export default connect(mapStateToProps, {submitempLogin})(empLogin);