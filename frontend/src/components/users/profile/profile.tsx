import React, { Component } from "react";

export default class Profile extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
     profile: {}
    };
  }

  async getProfile(event: any) {
    event.preventDefault();

    const headers = {
      "Content-Type": "application/json", 
      Accept: "application/json"
    }

    await fetch("http://localhost:5000/profile", {
      method: "post",
      headers: headers,
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(response => {
      this.setState({profile: response})
    })
    .catch(error => {
      this.setState({loginErrors: error});
    })
  }

  render() {
    return (
      <div>
        USER
      </div>
    );
  }
}