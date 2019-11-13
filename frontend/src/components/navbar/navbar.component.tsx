import * as React from 'react';
import { Img } from '../../styles/navbar.style';

export default class NavbarComponent extends React.Component<any> {

  // get login and logout
  constructor(props: any) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    console.log("IN LOGOUT");

    fetch("http://localhost:5000/logout")
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <h2><Img src="bee-128.png" alt="" /> WellBee </h2>
          </a>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home
                      <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact Us</a>
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {this.props.loggedInStatus !== "LOGGED_IN" ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">Signup</a>
                  </li>
                </>
              ) : (
                  <li className="nav-item">
                    <a className="nav-link" href="/home">
                      <button onClick={() => this.handleLogoutClick()}>Logout</button>
                    </a>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

