import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from "./components/layout/navbar";
import SidebarComponent from "./components/layout/sidebar";
import PatientPrivate from "./pages/patient.private";
import AdminPrivate from "./pages/admin.private";
import DoctorPrivate from "./pages/doctor.private";
import Profile from "./components/profile";
import PatientList from "./components/admin/list.patient";
import DoctorList from "./components/admin/list.doctor";
import RecordList from "./components/patient/record/list.record.tsx";
import AddRecord from "./components/patient/record/add.record";
import AccessList from "./components/patient/have.access";
import AuthorizeList from "./components/patient/authorizing";
import Login from "./pages/login.public";
import HomePublic from "./pages/home.public";
import SearchPatient from "./components/doctor/search.patient";
import Search from "./components/patient/search";
import Authorized from "./components/doctor/authorized";

/*
Class: App
- Base of application
- Handles login and logout
- Maintains overall state of application 
- Routing decides which component to render
*/
export default class App extends Component<any, any> {

  /*
  State: 
  - loggedInStatus = specifies if user if logged in or not
  - user = if logged in, there will be a user object
  - usertype = if logged in, usertype will also be specified
  */
  constructor(props: any) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      usertype: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // when logged out: set state to not logged in, removes user and usertype
  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      usertype: ""
    });
  }

  // when logged in: set state to logged in, saves user and usertype
  handleLogin(data: any, usertype: string) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      usertype: usertype
    });
  }

  render() {
    return (
      <div className="app" >
        <BrowserRouter>
          <NavbarComponent handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} user={this.state.user} />
          <SidebarComponent loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} />

          <Switch>
            <PrivatePatientRoute path="/user/addrecord" history={this.props.history} loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AddRecord} />} />
            <PrivatePatientRoute path="/user/record" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={RecordList} />
            <PrivatePatientRoute path="/user/search" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={() => <Search user={this.state.user} usertype={this.state.usertype} />} />
            <PrivatePatientRoute path="/user/access" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={() => <AccessList user={this.state.user} usertype={this.state.usertype} />} />
            <PrivatePatientRoute path="/user/authorize" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={() => <AuthorizeList user={this.state.user} usertype={this.state.usertype} />} />
            <PrivatePatientRoute path="/user" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientPrivate} />

            <PrivateAdminRoute path="/admin/user-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientList} />
            <PrivateAdminRoute path="/admin/doctor-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={DoctorList} />
            <PrivateAdminRoute path="/admin" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AdminPrivate} />

            <PrivateDoctorRoute path="/doctor/patient-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={SearchPatient} />
            <PrivateDoctorRoute path="/doctor/request" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={Authorized} />
            <PrivateDoctorRoute path="/doctor" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={DoctorPrivate} />

            <PrivateRoute path="/profile" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype}  component={() => <Profile handleLogout={this.handleLogout} user={this.state.user} usertype={this.state.usertype} />} />

            <Route exact path="/home" render={(props) => <HomePublic {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
            <Route exact path="/signup" render={(props) => <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
            <Route exact path="/login" render={(props) => <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
          </Switch>
        </BrowserRouter>
      </div >
    );
  }
}

// Private route for all users
// If logged in, renders component
// It not, redirects to login page
const PrivateRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

// Private route for user
// If logged in and usertype is a user, renders component
// It not, redirects to login page
const PrivatePatientRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN" && usertype === "user"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

// Private route for admin
// If logged in and usertype is a admin, renders component
// It not, redirects to login page
const PrivateAdminRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN" && usertype === "admin"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

// Private route for doctor
// If logged in and usertype is a doctor, renders component
// It not, redirects to login page
const PrivateDoctorRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN" && usertype === "doctor"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
