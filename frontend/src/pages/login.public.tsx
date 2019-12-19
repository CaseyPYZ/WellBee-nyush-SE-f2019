import React, { Component } from "react";

import Patient from '../components/auth/img/patient.jpg';
import Admin from '../components/auth/img/admin.png';
import Doctor from '../components/auth/img/doctor.png';

import { Div, Column } from "../styles/app.style";
import AdminAuth from "../components/auth/admin.auth";
import PatientAuth from "../components/auth/patient.auth";
import DoctorAuth from "../components/auth/doctor.auth";
import * as textStyle from '../styles/text.style';

/*
Class Login
- PUBLIC page 
- Determines which usertype to render login and signup form
*/
export default class Login extends Component<any, any> {

  /*
  State:
  - if admin is true: show admin login/signup form
  - if doctor is true: show doctor login/signup form
  - if patient is true: show patient login/signup form
  */
  constructor(props: any) {
    super(props);
    this.state = {
      admin: false,
      doctor: false,
      patient: false,
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.showAdmin = this.showAdmin.bind(this);
    this.showPatient = this.showPatient.bind(this);
    this.showDoctor = this.showDoctor.bind(this);
  }

  // Based on usertype, determines where to redirect page after login/signup
  handleSuccessfulAuth(data: any, usertype: string) {
    this.props.handleLogin(data, usertype);
    if (usertype === 'admin') {
      this.props.history.push(`/admin`);
    } else if (usertype === 'doctor') {
      this.props.history.push(`/doctor`);
    } else if (usertype === 'user') {
      this.props.history.push(`/user`);
    }
  }

  // Show Admin login form
  showAdmin() {
    this.setState({
      admin: true,
      patient: false,
      doctor: false
    })
  }

  // Show Patient login form
  showPatient() {
    this.setState({
      admin: false,
      patient: true,
      doctor: false
    })
  }

  // Show Doctor login form
  showDoctor() {
    this.setState({
      admin: false,
      patient: false,
      doctor: true
    })
  }

  render() {
    var verticalStyle = {
      width: "50%",
    };

    var container, button;
    button =
      <Column>
        <input type="image" id="image" alt="admin" src={Admin} style={verticalStyle} onClick={this.showAdmin}></input><br />
        <input type="image" id="image" alt="doctor" src={Doctor} style={verticalStyle} onClick={this.showDoctor}></input><br />
        <input type="image" id="image" alt="patient" src={Patient} style={verticalStyle} onClick={this.showPatient}></input>
      </Column>

    if (this.state.admin) {
      container = <AdminAuth adminLogin={this.state.admin} handleSuccessfulAuth={this.handleSuccessfulAuth} />
    } else if (this.state.patient) {
      container = <PatientAuth patientLogin={this.state.patient} handleSuccessfulAuth={this.handleSuccessfulAuth} />
    } else if (this.state.doctor) {
      container = <DoctorAuth patientLogin={this.state.doctor} handleSuccessfulAuth={this.handleSuccessfulAuth} />
    } else {
      button =
        <div>
          <Column>
            <input type="image" id="image" alt="admin" src={Admin} style={verticalStyle} onClick={this.showAdmin} /><br />
            <h3 style={textStyle.tagText} >ADMIN</h3>
          </Column>
          <Column>
            <input type="image" id="image" alt="doctor" src={Doctor} style={verticalStyle} onClick={this.showDoctor} /><br />
            <h3 style={textStyle.tagText} >DOCTOR</h3>
          </Column>
          <Column>
            <input type="image" id="image" alt="patient" src={Patient} style={verticalStyle} onClick={this.showPatient} />
            <h3 style={textStyle.tagText} >USER</h3>
          </Column>
        </div>
    }

    return (
      <Div data-testid="login-button">
        <h2 style={textStyle.pHeader}>Choose Account Type</h2>
        <br /><br /><br />
        {button}
        <div>
          {container}
        </div>
      </Div>
    );
  }
}