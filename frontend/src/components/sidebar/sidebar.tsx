import React from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from 'react-icons/fa';

export default class SidebarComponent extends React.Component<any, any> {
  render() {
    return (
      <>
        <div className="w3-sidebar w3-light-grey w3-bar-block">
          <h2 className="w3-bar-item"><img src="bee-128.png" alt="" ></img></h2>
          <div className="w3-bar-item w3-button"><Link to="/profile">Profile</Link></div>
          <div className="w3-bar-item w3-button"><Link to="/record">Record <FaCaretDown /></Link></div>
          <div className="w3-bar-item w3-button"><Link to="/access">Access</Link></div>
          <div className="w3-bar-item w3-button"><Link to="/authorized">Authorized</Link></div>
        </div>
      </>
    )
  }
}

