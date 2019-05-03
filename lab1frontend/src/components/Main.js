import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './LandingPage/Navbar';
import Login from './Login/Login';
import Home from './Home/Home';
import Create from './Create/Create';

class Main extends Component
{
    render()
    {
        return(
            <div>
                {}
                <Route path = "/" component = {Navbar} />
                <Route path = "/login" component = {Login} />
                <Route path = "/home" component = {Home} />
                <Route path = "/create" component = {Create} />
            </div>
        )
    }
}

export default Main;