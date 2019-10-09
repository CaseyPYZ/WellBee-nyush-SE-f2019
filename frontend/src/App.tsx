import * as React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import 'reset-css';

import HomePage from "./pages/home.page";
import SignupPage from "./pages/signup.page";
import LoginPage from "./pages/login.page";

const App = () => {
  return (
    <>

      <HashRouter>
        <Switch>
          <Route exact={true} path="/signup" component={SignupPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </HashRouter>
    </>
  );
};

export default App;