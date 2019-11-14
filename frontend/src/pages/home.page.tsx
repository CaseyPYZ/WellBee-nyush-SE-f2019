import React, { Component } from "react";
import HomePrivate from "../components/home/home.private";
import HomePublic from "../components/home/home.public";

export default class Home extends Component<any> {
 
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        {this.props.loggedInStatus === "LOGGED_IN" ? (
           <HomePrivate />
        ) : (
            <HomePublic />
          )}
      </div>
    );
  }
} 