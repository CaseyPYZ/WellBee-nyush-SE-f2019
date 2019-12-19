import React, { Component } from "react";
import { Div } from "../styles/pages.style";
import * as textStyle from "../styles/text.style"
import * as elementStyle from "../styles/element.style"


/*
Class: Profile
- Get user profile
- Update user profile
- Delete user account
*/
export default class Profile extends Component<any, any> {

  /*
  State:
  - profile = user profile information
  */
  constructor(props: any) {
    super(props);
    this.state = {
      profile: {
        name: String,
        gender: String,
        birthday: String,
        location: String,
        age: Number
      },
      usertype: "",
      user: {},
      update: false
    };

    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showUpdate = this.showUpdate.bind(this);
  }

  // Every time the component is rendered, get user profile
  componentDidMount() {
    this.getProfile();
  }

  // Call to server to GET user profile information
  async getProfile() {
    this.setState({
      usertype: this.props.usertype,
      user: this.props.user,
    })
    console.log(this.state)
    fetch("http://localhost:5000/account", {
      method: "get",
      credentials: "include",
    })
      .then(response => response.json())
      .then(response => {
        // if success, save profile information
        console.log(response)
        this.setState({ profile: response })
      })
      .catch(error => {
        // if error, save error
        this.setState({ loginErrors: error });
      })
  }

  // handle input
  handleChange(event: any) {
    this.setState({
      ...this.state.profile,
      [event.target.name]: event.target.value
    });
  }

  // Show update form
  showUpdate() {
    console.log("SHOW UPDATE")
    this.setState({ update: true })
  }

  // POST state
  // update user profile
  updateProfile(event: any) {
    event.preventDefault();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });
    fetch("http://localhost:5000/account/profile", {
      method: "post",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(this.state.profile)
    })
      .then(response => response.json())
      .then(response => {
        this.getProfile();
        this.setState({
          profile: response,
          update: false
        })
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

  // POST state
  // delete account
  // logout, and redirect to login page
  async deleteAccount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });
    fetch("http://localhost:5000/account/delete", {
      method: "post",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          profile: {},
          user: {},
          usertype: ""
        })
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })

    // once component removes user
    // tell rest of application and backend to remove user
    fetch("http://localhost:5000/logout", {
      method: "get"
    })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  // update profile form
  // profile information
  render() {
    if (this.state.update) {
      return (
        <Div>
          <div className="card">
            <div className="card-header">
              <p style={textStyle.pHeader}>UPDATE PROFILE INFORMATION</p>
            </div>
            <div className="card-body" >
              <form onSubmit={this.updateProfile}>
                <div className="form-group">

                  <input
                    type="name"
                    name="name"
                    placeholder="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />

                  <div><input
                    type="date"
                    name="birthday"
                    placeholder="Birthday"
                    value={this.state.birthday}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  /></div>

                  <div><input
                    type="number"
                    name="age"
                    placeholder="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  /></div>

                  <div><input
                    type="text"
                    name="location"
                    placeholder="address"
                    value={this.state.location}
                    onChange={this.handleChange}
                    className="form-control"
                    required
                  /></div>

                  <div className="input-group mb-3">
                    <select className="custom-select" id="inputGroupSelect02" onChange={this.handleChange}>
                      <option selected>gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="form-control btn btn-secondary">Update</button>
              </form>
            </div>
          </div>
        </Div>
      );
    } else {
      return (
        <Div>
          <div className="card">
            <div className="card-header">
              <p style={textStyle.pHeader}>Profile Information</p>
            </div>
            <img src="" alt="" />
            <div className="card-body" >
              <p style={textStyle.pText} >Name: {this.state.profile.name}</p>
              <p style={textStyle.pText} >Gender: {this.state.profile.gender}</p>
              <p style={textStyle.pText} >Age: {this.state.profile.age}</p>
              <p style={textStyle.pText} >Birthday: {this.state.profile.birthday}</p>
              <p style={textStyle.pText} >Location: {this.state.profile.location}</p>
            </div>

            <div style={elementStyle.profileButton} className="card-footer">
              <button className="btn btn-secondary btn-space" onClick={this.showUpdate}>Edit Profile</button>
              <button className="btn btn-secondary btn-space" onClick={this.deleteAccount}>Delete Account</button>
            </div>
          </div>
        </Div>
      );
    }

  }
}

