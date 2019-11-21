import React from 'react';
import Sidebar from "react-sidebar";
import { Link } from 'react-router-dom';

export default class SidebarComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open: any) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <div>
        <button className="primary" onClick={() => this.onSetSidebarOpen(true)}></button>
        <Sidebar
          sidebar={
          <b>
            <h2><img src="bee-128.png" alt="" ></img></h2>
            <div className="form-control"><Link to="/profile">Profile</Link></div>
            <div className="form-control"><Link to="/record">Record</Link></div>
            <div className="form-control"><Link to="/access">Access</Link></div>
            <div className="form-control"><Link to="/authorized">Authorized</Link></div>
          </b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
        </Sidebar>
      </div>
    );
  }
}

