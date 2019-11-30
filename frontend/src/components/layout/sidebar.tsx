import React from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from 'react-icons/fa';
import { Sidebar } from "../../styles/sidebar.style";

/*
NAVBAR
- logged out => nothing
- logged in => based on usertype, render different sidebar
  - PATIENT: own profile, own record, who has access, give authorization
  - ADMIN: own profile, patient list (patient records), doctor list (doctors list)
  - DOCTOR: own profile, list of patient access (patient records), ask for authorization (searchbar)
*/
export default class SidebarComponent extends React.Component<any, any> {

  render() {
    return (
      <>
        {this.props.loggedInStatus === "LOGGED_IN" && this.props.usertype === "patient" ? (
          <Sidebar className="w3-sidebar w3-light-grey w3-bar-block">
            <h2 className="w3-bar-item"><img src="bee-128.png" alt="" ></img></h2>
            <div className="w3-bar-item w3-button"><Link to="/profile">Profile</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/patient/record">Record <FaCaretDown /></Link></div>
            <div className="w3-bar-item w3-button"><Link to="/patient/access">Access</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/patient/authorize">Authorize</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/patient/family">Family</Link></div>
          </Sidebar>
        ) : (this.props.loggedInStatus === "LOGGED_IN" && this.props.usertype === "doctor" ? (
          <div className="w3-sidebar w3-light-grey w3-bar-block">
            <h2 className="w3-bar-item"><img src="bee-128.png" alt="" ></img></h2>
            <div className="w3-bar-item w3-button"><Link to="/profile">Profile</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/doctor/patient-list">Patient List</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/doctor/request">Request</Link></div>
          </div>
        ) : (this.props.loggedInStatus === "LOGGED_IN" && this.props.usertype === "admin" ? (
          <Sidebar className="w3-sidebar w3-light-grey w3-bar-block">
            <h2 className="w3-bar-item"><img src="bee-128.png" alt="" ></img></h2>
            <div className="w3-bar-item w3-button"><Link to="/profile">Profile</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/admin/patient-list">Patient List</Link></div>
            <div className="w3-bar-item w3-button"><Link to="/admin/doctor-list">Doctor List</Link></div>
          </Sidebar>
        ) : (
            <>
            </>
          )))}
      </>
    )
  }
}

