import React, { Component } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class PatientAuth extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      usertype: "user",
      facebook: "",
      twitter: "",
      google: "",
      tokens: [],
      profile: {
        name: "",
        gender: "",
        birthday: "",
        location: "",
        website: "",
        picture: ""
      },
      errors: [],
      auth: {
        login: true,
        signup: false
      }
    };

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.getSignup = this.getSignup.bind(this);
  }

  getSignup() {
    this.setState({
      auth: {
        login: false,
        signup: true
      }
    })
  }

  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
    console.log(event.target.name)
    console.log(event.target.value)

  }

  handleProfileChange(event: any) {
    this.setState({
      profile: {
        ...this.state.profile,
        [event.target.name]: event.target.value
      }
    })
    console.log(this.state.profile)
  }

  async handleLoginSubmit(event: any) {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    await fetch("http://localhost:5000/login", {
      method: "post",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.props.handleSuccessfulAuth(response, this.state.usertype);
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

  async handleSignupSubmit(event: any) {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    await fetch("http://localhost:5000/signup", {
      method: "post",
      headers: headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.props.handleSuccessfulAuth(response, this.state.usertype);
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

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
                <input type="submit" value="Login" className="btn login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Don't have an account?<button onClick={this.getSignup}>Sign Up</button>
            </div>
            <div className="d-flex justify-content-center">
              <Link to="/">Forgot your password?</Link>
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

                <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect02" onChange={this.handleProfileChange}>
                    <option >gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <button type="submit" className="form-control">Register</button>
              </div>
            </form>
          </div >
        </>
    }

    return (
      <div className="card">
        <div className="card-header">
          <h3>PATIENT</h3>
        </div>
        {show}
      </div>
    );
  }
}