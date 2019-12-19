import React, { Component } from "react";
import { Div } from "../styles/pages.style";

/*
Home page for PATIENT
*/
export default class PatientPrivate extends Component<any, any> {
  render() {
    return (
      <Div>
        <div>
          <h3>HI PATIENT</h3>
          <h2>WELCOME {this.props.user.email} </h2>
        </div>
      </Div>
    );
  }
}

