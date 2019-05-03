import React, {Component} from 'react';
import Axios from 'axios';

class CreateEmp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            emp_id: "",
            emp_ssn: "",
            emp_firstname: "",
            emp_lastname: "",
            emp_dob: "",
            emp_salary: "",
            emp_password: "",
            emp_dno: ""
        }

        this.emp_idHandler = this.emp_idHandler.bind(this);
        this.emp_ssnHandler = this.emp_ssnHandler.bind(this);
        this.emp_firstnameHandler = this.emp_firstnameHandler.bind(this);
        this.emp_lastnameHandler = this.emp_lastnameHandler.bind(this);
        this.emp_dobHandler = this.emp_dobHandler.bind(this);
        this.emp_salaryHandler = this.emp_salaryHandler.bind(this);
        this.emp_passwordHandler = this.emp_passwordHandler.bind(this);
        this.emp_dnoHandler = this.emp_dnoHandler.bind(this);

        this.submitCreate = this.submitCreate.bind(this);
    }

    emp_idHandler = (e) => {
        this.setState({
            emp_id: e.target.value
        })
    }

    emp_ssnHandler = (e) => {
        this.setState({
            emp_ssn: e.target.value
        })
    }

    emp_firstnameHandler = (e) => {
        this.setState({
            emp_firstname: e.target.value
        })
    }

    emp_lastnameHandler = (e) => {
        this.setState({
            emp_lastname: e.target.value
        })
    }

    emp_dobHandler = (e) => {
        this.setState({
            emp_dob: e.target.value
        })
    }

    emp_salaryHandler = (e) => {
        this.setState({
            emp_salary: e.target.value
        })
    }

    emp_passwordHandler = (e) => {
        this.setState({
            emp_password: e.target.value
        })
    }

    emp_dnoHandler = (e) => {
        this.setState({
            emp_dno: e.target.value
        })
    }

    submitCreate = (e) => {
        const data = {
            emp_id: this.state.emp_id,
            emp_ssn: this.state.emp_ssn,
            emp_firstname: this.state.emp_firstname,
            emp_lastname: this.state.emp_lastname,
            emp_dob: this.state.emp_dob,
            emp_salary: this.state.emp_salary,
            emp_password: this.state.emp_password,
            emp_dno: this.state.emp_dno
        }

        Axios.post('http://localhost:3001/createemp', data);
    }

    render(){
        return(
            <div>
                <h2>Create a New Employee</h2>

                <br />
                <div class = "container">
                    <form>
                        <div style = {{width: '30%'}} class = "form-group">
                            Employee ID: <br />
                            <input onChange = {this.emp_idHandler} type = "text" class = "form-control" name = "emp_id" placeholder = "Employee ID" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee Social Security Number: <br />
                            <input onChange = {this.emp_ssnHandler} type = "text" class = "form-control" name = "emp_ssn" placeholder = "Employee SSN" required />   
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee First Name: <br />
                            <input onChange = {this.emp_firstnameHandler} type = "text" class = "form-control" name = "emp_firstname" placeholder = "Employee First Name" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee Last Name: <br />
                            <input onChange = {this.emp_lastnameHandler} type = "text" class = "form-control" name = "emp_lastname" placeholder = "Employee Last Name" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee Date of Birth: <br />
                            <input onChange = {this.emp_dobHandler} type = "text" class = "form-control" name = "emp_dob" placeholder = "Employee DOB" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee Salary: <br />
                            <input onChange = {this.emp_salaryHandler} type = "text" class = "form-control" name = "emp_salary" placeholder = "Employee Salary" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee Password: <br />
                            <input onChange = {this.emp_passwordHandler} type = "password" class = "form-control" name = "emp_password" placeholder = "Employee Password" required />
                        </div>

                        <div style = {{width: '30%'}} class = "form-group">
                            <br />Employee Department Number: <br />
                            <input onChange = {this.emp_dnoHandler} type = "text" class = "form-control" name = "emp_dno" placeholder = "Employee Dept No" required />
                        </div>

                        <div style = {{width: '30%'}}>
                            <br />
                            <button class = "btn btn-success" type = "submit" onClick = {this.submitCreate}>Create New Employee</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateEmp;