import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from "./components/layout/navbar";
import SidebarComponent from "./components/layout/sidebar";
import HomePublic from "./pages/home.public";
import PatientPrivate from "./pages/patient.private";
import AdminPrivate from "./pages/admin.private";
import DoctorPrivate from "./pages/doctor.private";
import Profile from "./components/profile";
import PatientList from "./components/list.patient";
import DoctorList from "./components/list.doctor";
import RecordList from "./components/record/list.record.tsx";
import AddRecord from "./components/record/add.record";
import AccessList from "./components/access";
import AuthorizeList from "./components/authorize";
import Family from "./components/family";

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
    console.log('LOGIN')
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
            <PrivatePatientRoute path="/patient/addrecord" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AddRecord} />
            <PrivatePatientRoute path="/patient/record" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={RecordList} />
            <PrivatePatientRoute path="/patient/access" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AccessList} />
            <PrivatePatientRoute path="/patient/authorize" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AuthorizeList} />
            <PrivatePatientRoute path="/patient/family" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={Family} />
            <PrivatePatientRoute path="/patient" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientPrivate} />

            <PrivateAdminRoute path="/admin/patient-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientList} />
            <PrivateAdminRoute path="/admin/doctor-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={DoctorList} />
            <PrivateAdminRoute path="/admin" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={AdminPrivate} />

            <PrivateDoctorRoute path="/doctor/patient-list" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={PatientList} />
            <PrivateDoctorRoute path="/doctor" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={DoctorPrivate} />

            <PrivateRoute path="/profile" loggedInStatus={this.state.loggedInStatus} usertype={this.state.usertype} component={Profile} />
            <Route path="/" render={(props) => <HomePublic {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />} />
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
    loggedInStatus === "LOGGED_IN" && usertype === "patient"
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
