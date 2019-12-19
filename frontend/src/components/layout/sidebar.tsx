import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../styles/sidebar.style";
import * as textStyle from "../../styles/text.style";
import * as elementStyle from "../../styles/element.style";


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
        {this.props.loggedInStatus === "LOGGED_IN" && this.props.usertype === "user" ? (
          <Sidebar className="w3-sidebar w3-light-grey w3-bar-block ">
            <div className="w3-bar-item"><img src="bee-128.png" alt="" style={elementStyle.sideBarImg}></img></div>
            <div className="w3-bar-item w3-button" ><Link style={textStyle.sideLinkText} to="/profile">Profile</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/user/record">Record</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/user/search">Search</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/user/access">Authorized</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/user/authorize">Authorizing</Link></div>
          </Sidebar>
        ) : (this.props.loggedInStatus === "LOGGED_IN" && this.props.usertype === "doctor" ? (
          <div className="w3-sidebar w3-light-grey w3-bar-block">
            <h2 className="w3-bar-item"><img src="bee-128.png" alt="" ></img></h2>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/profile">Profile</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/doctor/patient-list">Search</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/doctor/request">Authorized</Link></div>
          </div>
        ) : (this.props.loggedInStatus === "LOGGED_IN" && this.props.usertype === "admin" ? (
          <Sidebar className="w3-sidebar w3-light-grey w3-bar-block">
            <h2 className="w3-bar-item"><img src="bee-128.png" alt="" ></img></h2>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/profile">Profile</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/admin/user-list">User List</Link></div>
            <div className="w3-bar-item w3-button"><Link style={textStyle.sideLinkText} to="/admin/doctor-list">Doctor List</Link></div>
          </Sidebar>
        ) : (
            <>
            </>
          )))}
      </>
    )
  }
}

