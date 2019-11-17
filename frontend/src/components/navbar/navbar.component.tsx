import * as React from 'react';
import { Img } from '../../styles/navbar.style';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class NavbarComponent extends React.Component<any> {

  constructor(props: any) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    console.log("IN LOGOUT");

    fetch("http://localhost:5000/logout", {
      method: "get"
    })
      .then(response => {
        console.log(response);
        this.props.handleLogout();
        // return <Redirect to='/login' />      
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h2><Img src="bee-128.png" alt="" /> WellBee </h2>
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home
                      <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {this.props.loggedInStatus !== "LOGGED_IN" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              ) : (
                  <li className="nav-item">

                    <Dropdown >
                      <DropdownToggle caret>
                        {this.props.user.email}
                      </DropdownToggle>
                      <DropdownMenu>
                        <Link to="/">
                          <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <Link to="/">
                          <DropdownItem>Record</DropdownItem>
                        </Link>
                        <Link to="/">
                          <DropdownItem>Emergency</DropdownItem>
                        </Link>
                        <Link className="nav-link" to="/home"
                          onClick={() => this.handleLogoutClick()}>
                          Logout
                        </Link>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}