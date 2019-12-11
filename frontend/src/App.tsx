import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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

export default class App extends Component<any, any> {

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

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      usertype: ""
    });
  }

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
            <PrivatePatientRoute path="/user/search" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={() => <Search user={this.state.user} usertype={this.state.usertype}/>} /> />
            <PrivatePatientRoute path="/user/access" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={() => <AccessList user={this.state.user} usertype={this.state.usertype}/>} /> />
            <PrivatePatientRoute path="/user/authorize" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={() => <AuthorizeList user={this.state.user} usertype={this.state.usertype}/>} /> />
            <PrivatePatientRoute path="/user" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientPrivate} />

            <PrivateAdminRoute path="/admin/user-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientList} />
            <PrivateAdminRoute path="/admin/doctor-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={DoctorList} />
            <PrivateAdminRoute path="/admin" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AdminPrivate} />

            <PrivateDoctorRoute path="/doctor/patient-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={SearchPatient} />
            <PrivateDoctorRoute path="/doctor" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={DoctorPrivate} />

            <PrivateRoute path="/profile" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={Profile} />

            <Route exact path="/home" render={(props) => <HomePublic {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
            <Route exact path="/signup" render={(props) => <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
            <Route exact path="/login" render={(props) => <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
          </Switch>
        </BrowserRouter>
      </div >
    );
  }
}

const PrivateRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

const PrivatePatientRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN" && usertype === "user"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};


const PrivateAdminRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN" && usertype === "admin"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

const PrivateDoctorRoute = ({ component, loggedInStatus, usertype, ...rest }: any) => {
  const routeComponent = (props: any) => (
    loggedInStatus === "LOGGED_IN" && usertype === "doctor"
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }} />
  );
  return <Route {...rest} render={routeComponent} />;
};
