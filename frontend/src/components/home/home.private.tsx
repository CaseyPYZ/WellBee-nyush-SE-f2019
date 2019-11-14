import React, { Component } from "react";

export default class HomePrivate extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
    };
  }


  render() {
    return (
      <>
        <div>
          <button className="btn btn-warning btn-circle btn-circle-sm m-1">User</button>
          <button className="btn btn-warning btn-circle btn-circle-sm m-1">Profile</button>
          <button className="btn btn-warning btn-circle btn-circle-sm m-1">Record</button>
          <button className="btn btn-warning btn-circle btn-circle-sm m-1">Smth</button>
          <button className="btn btn-warning btn-circle btn-circle-sm m-1">Smth</button>
        </div>
      </>
    )
  }
} 