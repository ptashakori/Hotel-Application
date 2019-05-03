import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Navbar from './LandingPage/Navbar';

import Login from './Login/Login';
import empLogin from './Login/empLogin';

import Home from './Home/Home';

import Create from './Create/Create';
import empCreate from './Create/empCreate';

class Main extends Component
{
    render()
    {
        return(
            <div>
                {}
                <Route path = "/" component = {Navbar} />
                <Route path = "/login" component = {Login} />
                <Route path = "/emplogin" component = {empLogin} />
                <Route path = "/home" component = {Home} />
                <Route path = "/create" component = {Create} />
                <Route path = "/empcreate" component = {empCreate} />
            </div>
        )
    }
}

export default Main;