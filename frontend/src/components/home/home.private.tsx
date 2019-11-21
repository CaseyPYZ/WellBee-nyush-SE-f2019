import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePrivate extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <>
        <h1>STATUS: {this.props.loggedInStatus}</h1>
        <div>
          <Link to='/profile'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Profile</button></Link>
          <Link to='/record'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Record</button></Link>
          <Link to='/access'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Access</button></Link>
          <Link to='/authorized'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Authorized</button></Link>
          <Link to='/emergency'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Emergency</button></Link>
        </div>
      </>
    );
  }
}

