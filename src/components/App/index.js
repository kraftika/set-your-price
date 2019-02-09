import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "components/Navigation";
import ROUTES from "constants/routes";
import Home from "components/Home";
import Admin from "components/Admin";
import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import Landing from "components/Landing";
import ServicesList, { Service } from "components/Services";
import ProductsList, { Product } from "components/Products";
import PasswordForget from "components/PasswordForget";
import Account from "components/Account";

const App = () => (
  <React.Fragment>
    <Router>
      <React.Fragment>
        <Navigation />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.ADMIN} component={Admin} />
        <Route exact path={ROUTES.ACCOUNT} component={Account} />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={ROUTES.PRODUCTS} component={ProductsList} />
        <Route exact path={ROUTES.SERVICES} component={ServicesList} />
        <Route exact path={ROUTES.SERVICE} component={Service} />
        <Route exact path={ROUTES.PRODUCT} component={Product} />
      </React.Fragment>
    </Router>
  </React.Fragment>
);

export default App;
