import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePublic extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <div>
        <Link to='/admin'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Admin</button></Link>
        <Link to='/patient'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Patient</button></Link>
        <Link to='/doctor'><button className="btn btn-warning btn-circle btn-circle-sm m-1">Doctor</button></Link>
      </div>
    );
  }
}