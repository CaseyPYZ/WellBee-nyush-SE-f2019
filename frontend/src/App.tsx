import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/home.page";
import SignupPage from "./pages/signup.page";
import LoginPage from "./pages/login.page";
import AboutPage from "./pages/about.page";
import ContactusPage from "./pages/contactus.page";
import NavbarComponent from "./components/navbar/navbar.component";

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async checkLoginStatus() {
    const response: any = await fetch("http://localhost:5000")
    if (response.user &&
      this.state.loggedInStatus === "NOT_LOGGED_IN") {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: response.ok
      });
    } else if (
      !response.user &&
      (this.state.loggedInStatus === "LOGGED_IN")
    ) {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      });
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLogin(data: any) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div className="app" >
        <NavbarComponent handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/signup" component={SignupPage} />
            <Route
              exact={true}
              path="/login"
              render={props =>
                (<LoginPage 
                  {...props} 
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus} />)
              } />
            <Route exact={true} path="/about" component={AboutPage} />
            <Route exact={true} path="/contact" component={ContactusPage} />
            <Route
              exact={true}
              path="/"
              render={props =>
                (<Home loggedInStatus={this.state.loggedInStatus} />)
              } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}