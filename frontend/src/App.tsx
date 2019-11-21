import React, { Component } from "react";
import { BrowserRouter, Switch, Route, RouteProps, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import SignupPage from "./components/signup/signup.page";
import LoginPage from "./components/login/login.page";
import NavbarComponent from "./components/navbar/navbar.component";
import SidebarComponent from "./components/sidebar/sidebar";
import HomePrivate from "./components/home/home.private";
import HomePublic from "./components/home/home.public";

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
            <Route exact path="/"
              render={props =>
                (<HomePublic loggedInStatus={this.state.loggedInStatus} />)
              } />
            <PrivateRoute>
              <Route exact path="/home"
                render={props =>
                  (<HomePrivate loggedInStatus={this.state.loggedInStatus} />)
                } />
              <Route path="/sidebar" component={SidebarComponent} />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      localStorage.getItem("token")  ?
        <React.Component {...props} />
        : <Redirect to="/signin" />
    )} />
  );
};