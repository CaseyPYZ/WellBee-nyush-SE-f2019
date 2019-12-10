import React, { Component } from "react";

import Patient from '../components/auth/img/patient.jpg';
import Admin from '../components/auth/img/admin.png';
import Doctor from '../components/auth/img/doctor.png';

import { Div, Column } from "../styles/app.style";
import AdminAuth from "../components/auth/admin.auth";
import PatientAuth from "../components/auth/patient.auth";
import DoctorAuth from "../components/auth/doctor.auth";

/*
PUBLIC page
- choose user type
- login or sign up
*/
export default class Login extends Component<any, any> {

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

  handleSuccessfulAuth(data: any, usertype: string) {
    this.props.handleLogin(data, usertype);
    if (usertype === 'admin') {
      this.props.history.push(`/admin`);
    } else if (usertype === 'doctor') {
      this.props.history.push(`/doctor`);
    } else if (usertype === 'user') {
      this.props.history.push(`/patient`);
    }
    console.log('USER: ' + usertype);
  }

  showAdmin() {
    this.setState({
      admin: true,
      patient: false,
      doctor: false
    })
  }

  showPatient() {
    this.setState({
      admin: false,
      patient: true,
      doctor: false
    })
  }

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
            <h3>ADMIN</h3>
          </Column>
          <Column>
            <input type="image" id="image" alt="doctor" src={Doctor} style={verticalStyle} onClick={this.showDoctor} /><br />
            <h3>DOCTOR</h3>
          </Column>
          <Column>
            <input type="image" id="image" alt="patient" src={Patient} style={verticalStyle} onClick={this.showPatient} />
            <h3>PATIENT</h3>
          </Column>
        </div>
    }

    return (
      <Div>
        <h2>Choose Account Type</h2>
        <br />
        {button}
        <div>
          {container}
        </div>
      </Div>
    );
  }
}