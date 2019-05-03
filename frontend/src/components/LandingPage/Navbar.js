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
        let redirectVar = null;

        if (cookie.load('cookie'))
        {
            redirectVar = <Redirect to = "/home" />
        }

        return(
            <div>
                {redirectVar}

                <nav class = "navbar navbar-inverse">
                    <div class = "container-fluid">
                        <ul class = "nav navbar-nav-right top-nav">
                            <li><Link to = "/home">Home Page</Link></li>
                            <li><Link to = "/login">Guest Login</Link></li>
                            <li><Link to = "/create">Create a New User</Link></li>
                            <li><Link to = "/createemp">Create a New Employee</Link></li>
                            <li><Link to = "/" onClick = {this.handleLogout}><span class = "glyphicon glyphicon-user"></span>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;