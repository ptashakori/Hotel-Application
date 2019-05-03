import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

class createAnnouncement extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            email: "",
            course_id: "",
            announcement: ""
        }

        this.emailHandler = this.emailHandler.bind(this);
        this.course_idHandler = this.course_idHandler.bind(this);
        this.announcementHandler = this.announcementHandler.bind(this);
    }

    emailHandler = (e) => 
    {
        this.setState({
            email: e.target.value
        })
    }

    course_idHandler = (e) => 
    {
        this.setState({
            course_id: e.target.value
        })
    }

    announcementHandler = (e) => 
    {
        this.setState({
            announcement: e.target.value
        })
    }

    submitCreate = (e) =>
    {
        const data = 
        {
            email: this.state.email,
            course_id: this.state.course_id,
            announcement: this.state.announcement
        }

        axios.post('http://localhost:3001/createAnnouncement', data);
    }

    render()
    {
        return(
            <div class = "container">
                <div class = "login-form">
                    <div class = "main-div">
                        <div class = "panel">
                            <h2>Create an announcement:</h2>
                            <p>Please confirm your faculty email, course ID and then type out your announcement:</p>
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.emailHandler} type = "text" class = "form-control" name = "email" placeholder = "Faculty Email" />
                        </div>

                        <div class = "form-group">
                            <input onChange = {this.course_idHandler} type = "text" class = "form-control" name = "course_id" placeholder = "Course ID" />
                        </div>

                        <br></br>

                        <div class = "form-group">
                            <input onChange = {this.announcementHandler} type = "text" class = "form-control" name = "announcement" placeholder = "Announcement" />
                        </div>

                        <button onClick = {this.submitCreate} class = "btn btn-primary">Create Announcement</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default createAnnouncement;