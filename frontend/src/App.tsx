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
    console.log("CHECK LOGIN STATUS");
    console.log(response);

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
    console.log("LOGIN", data.user);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div className="app" >
        <BrowserRouter>
          <NavbarComponent handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} user={this.state.user} />
          <Switch>
            <Route exact path="/signup"
              render={props =>
                (<SignupPage {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus} />)
              } />
            <Route exact path="/login"
              render={props =>
                (<LoginPage {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus} />)
              } />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/contact" component={ContactusPage} />
            <Route exact path="/"
              render={props =>
                (<Home loggedInStatus={this.state.loggedInStatus} />)
              } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}