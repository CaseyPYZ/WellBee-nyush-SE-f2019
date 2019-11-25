import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Div } from "./styles/app.style";

import SignupPage from "./components/auth/signup/signup.page";
import LoginPage from "./components/auth/login/login.page";
import NavbarComponent from "./components/navbar/navbar.component";
import SidebarComponent from "./components/sidebar/sidebar";
import HomePrivate from "./components/home/home.private";
import HomePublic from "./components/home/home.public";
import Profile from "./components/users/profile/profile";
import RecordList from "./components/users/patient/record/list.record.tsx";
import AddRecord from "./components/users/patient/record/add.record";
import GetRecord from "./components/users/patient/record/get.record";
import AccessList from "./components/users/patient/access/access";

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

  checkLogin() {

  }

  render() {
    return (
      <div className="app" >
        <BrowserRouter>

          <NavbarComponent handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} user={this.state.user} />
          <SidebarComponent />

          <Div>
            <Switch>
              <PrivateRoute path='/home' loggedInStatus={this.state.loggedInStatus} component={HomePrivate}/>
              <PrivateRoute path="/profile" component={Profile}/>
              <PrivateRoute path="/record/add" component={AddRecord} />
              <PrivateRoute path="/record/get" component={GetRecord} />
              <PrivateRoute path="/record" component={RecordList} />
              <PrivateRoute path="/access" component={AccessList} />

              <Route path="/home" render={(props) => <HomePublic {...props} loggedInStatus={this.state.loggedInStatus} />} />
              <Route exact path="/signup" render={props => (<SignupPage {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />)} />
              <Route exact path="/login" render={props => (<LoginPage {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />)} />
            </Switch>
          </Div>

        </BrowserRouter>
      </div>
    );
  }
}

const PrivateRoute = ({ component, loggedInStatus, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};