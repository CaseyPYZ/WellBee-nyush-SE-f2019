import React, { Component } from "react";
import axios from "axios";


export default class Signup extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event: any) {
    console.log("IN SIGNUP");
    const { email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:5000/signup",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("sign up error", error);
      });
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
        this.props.handleSuccessfulAuth(response);
      })
      .catch(error => {
        this.setState({ loginErrors: error });
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div><input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          /></div>
          <div><input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          /></div>
          <div><input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          /></div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}