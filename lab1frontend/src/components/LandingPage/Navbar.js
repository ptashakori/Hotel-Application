import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

class Navbar extends Component
{
    constructor(props)
    {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () =>
    {
        cookie.remove('cookie', {path: '/'});
    }

    render()
    {
        let navLogin = null;

        if (cookie.load('cookie'))
        {
            console.log("Able to read cookie.. ");
            navLogin = (
                <ul class = "nav navbar-nav navbar-right">
                    <p>Student Links:</p>
                    <li><Link to = "/" onClick = {this.handleLogout}><span class = "glyphicon glyphicon-user"></span>Logout</Link></li>
                    <li><Link to = "/profile">View my Profile</Link></li>
                    <li><Link to = "/searchclasses">Search for Classes</Link></li>
                    <li><Link to = "/enrollClass">Enroll in a Class</Link></li>
                    <li><Link to = "/dropClass">Drop a Class</Link></li>
                    <li><Link to = "/viewClasses">View my Classes</Link></li>
                    <li><Link to = "/allOtherStudents">View All Students in a Course</Link></li>
                    <li><Link to = "/viewAnnouncement">View Announcements for a Course</Link></li>
                    <li><Link to = "/viewNotesAndFiles">View Lecture Notes and Files for a Course</Link></li>
                    <li><Link to = "/submitAssignment">Submit an Assignment</Link></li>
                    <li><Link to = "/viewGrades">View my Grades</Link></li>

                    <br></br>

                    <p>Faculty Links:</p>
                    <li><Link to = "/createcourse">Create a New Course</Link></li>
                    <li><Link to = "/viewFacultyCourses">View Faculty Created Courses</Link></li>
                    <li><Link to = "/dropStudent">Drop a Student from a Course</Link></li>
                    <li><Link to = "/allStudentsRegistered">View All Students Registered for a Course</Link></li>
                    <li><Link to = "/createAnnouncement">Create an Announcement</Link></li>
                    <li><Link to = "/lectureNotesAndFiles">Upload Lecture Notes and Files</Link></li>
                    <li><Link to = "/createAssignment">Create a New Assignment</Link></li>
                    <li><Link to = "/studentSubmissions">View Student Assignment Submissions</Link></li>
                    <li><Link to = "/createGrade">Grade a Student Assignment</Link></li>
                </ul>
            )
        }
        else
        {
            console.log("Not able to read cookie! Try logging in.. ");
            navLogin = (
                <ul class = "nav navbar-nav navbar-right">
                    <li><Link to = "/login"><span class = "glyphicon glyphicon-log-in"></span>Login</Link></li>
                </ul>
            )
        }

        let redirectVar = null;
        if (cookie.load('cookie'))
        {
            redirectVar = <Redirect to = "/home"/>
        }

        return(
            <div>
                {redirectVar}

            <nav class = "navbar navbar-inverse">
                <div class = "container-fluid">

                    <ul class = "nav navbar-nav">
                        <li class = "active"><Link to = "/home">Home</Link></li>
                        <li><Link to = "/create">Create a New User</Link></li>
                    </ul>
                    {navLogin}
                </div>
            </nav>
            </div>
        )
    }
}

export default Navbar;