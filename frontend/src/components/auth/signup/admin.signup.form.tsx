import React, { Component } from "react";

export default class AdminSignup extends Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      usertype: "admin",
      profile: {
        firstName: "",
        lastName: "", // separated
        gender: "",
        birthday: "",
        location: "",
        website: "",
        picture: ""
      },
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
          <div className="form-group">
            <p></p>
            <div className="alert alert-info form-group" role="alert">
              Please signup
          </div>
            <input
              type="string"
              name="first name"
              placeholder="first name"
              value={this.state.profile.firstName}
              onChange={this.handleChange}
              required
            />
            <input
              type="string"
              name="last name"
              placeholder="last name"
              value={this.state.profile.lastName}
              onChange={this.handleChange}
              required
            />
            
            <div>
            <input
              type="checkbox"
              name="gender"
              placeholder="male"
              value='male'
              checked={this.state.profile.gender === 'male'}
              onChange={this.handleChange}
              required
            />
            <input
              type="checkbox"
              name="gender"
              placeholder="female"
              value='female'
              checked={this.state.profile.gender === 'female'}
              onChange={this.handleChange}
              required
            />
            <input
              type="checkbox"
              name="gender"
              placeholder="none"
              value='none'
              checked={this.state.profile.gender === 'none'}
              onChange={this.handleChange}
              required
            />
            </div>

          <div><input
            type="date"
            name="Birthday"
            placeholder="birthday"
            value={this.state.profile.birthday}
            onChange={this.handleChange}
            className="form-control"
            required
          /></div>

          <br></br>
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

          <button type="submit" className="form-control">Register</button>
          </div>
        </form>
      </div >
    );
  }
}