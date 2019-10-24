import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import SignupPage from '../pages/signup.page';
import LoginPage from '../pages/login.page';
import AboutPage from '../pages/about.page';
import UserPage from '../pages/contactus.page';
import HomePage from '../pages/home.page';
import ContactusPage from '../pages/contactus.page';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/signup" component={SignupPage} />
                    <Route exact={true} path="/login" component={LoginPage} />
                    <Route exact={true} path="/about" component={AboutPage} />
                    <Route exact={true} path="/user" component={UserPage} />
                    <Route exact={true} path="/contact" component={ContactusPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </BrowserRouter>
        )
    }
}