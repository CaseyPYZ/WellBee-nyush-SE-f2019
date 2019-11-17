import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component<any, any> {

  constructor(props: any) {
    super(props);

    const email: string = "";
    const password: string = "";
    const loginErrors: string = "";

    this.state = {
      email,
      password,
      loginErrors
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    console.log("HERE");
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event: any) {
    console.log("BEFORE");
    console.log(this.state);

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
      this.props.handleSuccessfulAuth(response);
    })
    .catch(error => {
      this.setState({loginErrors: error});
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="alert alert-info form-group" role="alert">
              Please login
          </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              className="form-control"
              required
            />
            <div><input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              className="form-control"
              required
            /></div>
            <button type="submit" className="form-control">Login</button>
          </div>
        </form>
      </div>
    );
  }
}