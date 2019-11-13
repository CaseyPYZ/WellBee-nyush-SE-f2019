import React, { Component } from "react";

export default class HomePrivate extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
     
    };
  }

  render() {
    return (
      <div>
        Logged In Page
        <button className="button button5">User</button>
        <button className="button button5">Profile</button>
        <button className="button button5">Record</button>
        <button className="button button5">Smth</button>
        <button className="button button5">Smth</button>
      </div>
    );
  }
}