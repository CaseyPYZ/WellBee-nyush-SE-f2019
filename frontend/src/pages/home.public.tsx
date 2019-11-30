import React, { Component } from "react";

// import Background from '../components/auth/img/background.jpg';
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
export default class HomePublic extends Component<any, any> {

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
    } else if (usertype === 'patient') {
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
    // var sectionStyle = {
    //   backgroundImage: `url(${Background})`,
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat'
    // };

    var imageStyle = {
      width: "50%",
      backgroundColor: "transparent",
    };

    var container;
    if (this.state.admin) {
      container = <AdminAuth adminLogin={this.state.admin} handleSuccessfulAuth={this.handleSuccessfulAuth} />
    } else if (this.state.patient) {
      container = <PatientAuth patientLogin={this.state.patient} handleSuccessfulAuth={this.handleSuccessfulAuth} />
    } else if (this.state.doctor) {
      container = <DoctorAuth patientLogin={this.state.doctor} handleSuccessfulAuth={this.handleSuccessfulAuth} />
    }

    return (
      <Div>
        <h2>Choose Account Type</h2>
        <br />
        <Column>
          <input type="image" id="image" alt="admin" src={Admin} style={imageStyle} onClick={this.showAdmin}></input><br />
          <input type="image" id="image" alt="doctor" src={Doctor} style={imageStyle} onClick={this.showDoctor}></input><br />
          <input type="image" id="image" alt="patient" src={Patient} style={imageStyle} onClick={this.showPatient}></input>
        </Column>
        <div>
          {container}
        </div>
      </Div>
    );
  }
}