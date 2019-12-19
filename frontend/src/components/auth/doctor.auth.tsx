import React, { Component } from "react";
import { FaUser, FaKey } from "react-icons/fa";

/*
Class: DoctorAuth
- Login / Sign up for doctor
*/
export default class DoctorAuth extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: String,
      password: String,
      password_confirmation: String,
      usertype: "doctor",
      profile: {
        name: String,
        gender: String,
        birthday: String,
        location: String,
        website: String,
        picture: String
      },
      errors: String,
      auth: {
        login: true,
        signup: false
      }
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.getSignup = this.getSignup.bind(this);
  }

  // render sign up form
  getSignup() {
    this.setState({
      auth: {
        login: false,
        signup: true
      }
    })
  }

  // handles input 
  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // handles input for sign up
  handleProfileChange(event: any) {
    this.setState({
      profile: {
        ...this.state.profile,
        [event.target.name]: event.target.value
      }
    })
  }

  // when submit login, authenticate in backend
  async handleLoginSubmit(event: any) {
    event.preventDefault();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });
    fetch("http://localhost:5000/login", {
      method: "post",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        this.props.handleSuccessfulAuth(response, this.state.usertype);
      })
      .catch(error => {
        this.setState({ errors: error });
      })
  }

  // when submit signup, create user in backend
  async handleSignupSubmit(event: any) {
    event.preventDefault();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": 'http://localhost:5000/'
    });
    fetch("http://localhost:5000/signup", {
      method: "post",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        this.props.handleSuccessfulAuth(response, this.state.usertype);
      })
      .catch(error => {
        this.setState({ errors: error });
      })
  }

  // doctor login / sign up form
  render() {
    var show;
    if (this.state.auth.login) {
      show =
        <>
          <div className="card-body">
            <form onSubmit={this.handleLoginSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaUser /></span>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="form-control"
                  value={this.state.profile.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaKey /></span>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-control"
                  value={this.state.profile.password}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input type="submit" value="Login" className="btn login_btn btn-secondary" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<button onClick={this.getSignup}>Sign Up</button>
            </div>
          </div>
        </>
    } else if (this.state.auth.signup) {
      show =
        <>
          <div className="card-body">
            <form onSubmit={this.handleSignupSubmit}>
              <div className="form-group">

                <div><input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                  required
                /></div>

                <div><input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control"
                  required
                /></div>

                <div><input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                  className="form-control"
                  required
                /></div>
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={this.state.profile.name}
                  onChange={this.handleProfileChange}
                  required
                />

                <div><input
                  type="date"
                  name="birthday"
                  placeholder="Birthday"
                  value={this.state.profile.birthday}
                  onChange={this.handleProfileChange}
                  className="form-control"
                  required
                /></div>

                <div><input
                  type="number"
                  name="age"
                  placeholder="age"
                  value={this.state.profile.age}
                  onChange={this.handleProfileChange}
                  className="form-control"
                  required
                /></div>

                <div><input
                  type="text"
                  name="location"
                  placeholder="address"
                  value={this.state.profile.location}
                  onChange={this.handleProfileChange}
                  className="form-control"
                  required
                /></div>

                <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect02" name="gender" onChange={this.handleProfileChange}>
                    <option selected>gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <button type="submit" className="form-control btn btn-secondary">Register</button>
              </div>
            </form>
          </div >
        </>
    }
    return (
      <div className="card">
        <div className="card-header">
          <h3>DOCTOR</h3>
        </div>
        {show}
      </div>
    );
  }
}