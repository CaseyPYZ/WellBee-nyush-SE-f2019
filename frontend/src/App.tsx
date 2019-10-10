import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import 'reset-css';

import HomePage from "./pages/home.page";
import SignupPage from "./pages/signup.page";
import LoginPage from "./pages/login.page";
import NavbarComponent from "./components/navbar.component";
import { Component } from "react";
import AboutPage from "./pages/about.page";
import UserPage from "./pages/user.page";

const navigation = {
  brand: {name: 'WellBee', to: '/'},
  links: [
    { name: 'About', to: '/about' },
    { name: 'User', to: '/user' },
    { name: 'Login', to: '/login' },
    { name: 'Sign Up', to: '/signup' }
  ]
}

class App extends Component {
  public render() {
    const { brand, links } = navigation;

    return (
    <>
      <div className='App'>
        <NavbarComponent brand={brand} links={links}/>
      </div>

      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/signup" component={SignupPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/about" component={AboutPage} />
          <Route exact={true} path="/user" component={UserPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </>
    )
  }
}

export default App;