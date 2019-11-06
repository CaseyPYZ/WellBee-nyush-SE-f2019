import React, { Component } from 'react';
import NavbarComponent from "./components/navbar/navbar.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./route/router";

class App extends Component {
  public render() {
    return (
    <>
      <NavbarComponent />
      <Router />
    </>
    )
  }
}

export default App;