import React, { Component } from "react";
import { Div } from "../styles/pages.style";

/*
Home page for DOCTOR
*/
export default class DoctorPrivate extends Component<any, any> {
  render() {
    return (
      <Div>
        <h1>STATUS: {this.props.loggedInStatus}</h1>
        <div>
          <h3>HI DOCTOR</h3>
        </div>
      </Div>
    );
  }
}

