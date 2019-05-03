import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Create from './Create/Create';
import Home from './Home/Home';
import Navbar from './LandingPage/Navbar';
import Login from './Login/Login';
import empLogin from './Login/empLogin';
import CreateEmp from './Create/CreateEmp';

// Create a Main Component
class Main extends Component
{
    render()
    {
        return(
            <div>
                {/*Render different components based on route*/}
                <Route path = "/Create" component = {Create} />
                <Route path = "/Home" component = {Home} />
                <Route path = "/" component = {Navbar} />
                <Route path = "/login" component = {Login} />
                <Route path = "/emplogin" component = {empLogin} />
                <Route path = "/createemp" component = {CreateEmp} />
                
            </div>
        )
    }
}

export default Main;