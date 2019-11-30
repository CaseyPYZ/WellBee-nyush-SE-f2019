import * as React from 'react';
import { Img, Navbar } from '../../styles/navbar.style';
import { Link } from 'react-router-dom';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

/*
NAVBAR
- logged out => ???
- logged in => logout & username
*/
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
        this.props.history.push(`/login`);
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <h2><Img src="bee-128.png" alt="" /> WellBee </h2>
          </Link>

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
                    <UncontrolledDropdown setActiveFromChild>
                      <DropdownToggle tag="a" className="nav-link" caret>
                        {this.props.user.email}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem><Link to="/"
                          onClick={() => this.handleLogoutClick()}>
                          Logout
                        </Link></DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </Navbar>
    )
  }
}