import React, { Component } from "react";
import { Div } from "../styles/pages.style";

/*
- Get profile
- Update password
- Delete Account
*/
export default class Profile extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      profile: {}
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    await fetch("http://localhost:5000/account", {
      method: "get",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ profile: response })
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

  async updateProfile() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    await fetch("http://localhost:5000/account/profile", {
      method: "post",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ profile: response })
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

  changePassword() {
    //post to /account/password
  }

  async deleteAccount() {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    await fetch("http://localhost:5000/account/delete", {
      method: "post",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ profile: response })
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

  render() {
    return (
      <Div>
        <h2>PROFILE INFORMATION</h2>
        <img src="" alt=""/>
        <h4>Email: {this.state.profile.email}</h4>
        <h4>Name: {this.state.profile.name}</h4>
        <h4>Gender: {this.state.profile.gender}</h4>
        <h4>Location: {this.state.profile.location}</h4>
        <h4>Birthday: {this.state.profile.birthday}</h4>
        <h4>Website: {this.state.profile.website}</h4>

        <button className="" onClick={this.changePassword}>Change Password</button>
        <button className="" onClick={this.updateProfile}>Edit Profile</button>
        <button className="" onClick={this.deleteAccount}>Delete Account</button>
      </Div>
    );
  }
}