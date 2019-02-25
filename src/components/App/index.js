import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "components/Navigation";
import ROUTES from "constants/routes";
import Home from "components/Home";
import Admin from "components/Admin";
import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import Landing from "components/Landing";
import ServicesList, { CreateService } from "components/Services";
import ProductsList, { CreateProduct, EditProduct } from "components/Products";
import PasswordForget from "components/PasswordForget";
import Account from "components/Account";
import { withAuthentication } from "components/Session";

const App = () => (
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
      <Route exact path={ROUTES.CREATE_PRODUCT} component={CreateProduct} />
      <Route exact path={ROUTES.EDIT_PRODUCT} component={EditProduct} />
      <Route exact path={ROUTES.SERVICES} component={ServicesList} />
      <Route exact path={ROUTES.CREATE_SERVICE} component={CreateService} />
      {/* <Route exact path={ROUTES.EDIT_SERVICE} component={CreateService} /> */}
    </React.Fragment>
  </Router>
);

export default withAuthentication(App);
