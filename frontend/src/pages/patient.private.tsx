import React, { Component } from "react";
import { Div } from "../styles/pages.style";

/*
Once logged in as an PATIENT
*/
export default class PatientPrivate extends Component<any, any> {
  render() {
    return (
      <Div>
        <h1>STATUS: {this.props.loggedInStatus}</h1>
        <div>
          <h3>HI PATIENT</h3>
        </div>
      </Div>
    );
  }
}

