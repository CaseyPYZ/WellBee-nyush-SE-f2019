import React, { Component } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class PatientAuth extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: String,
      password: String,
      password_confirmation: String,
      usertype: "patient",
      facebook: String,
      twitter: String,
      google: String,
      tokens: Array,
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

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
              <div className="row align-items-center remember">
                <input type="checkbox" />Remember Me
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