import React from "react";
import { Link } from "react-router-dom";

import ROUTES from "constants/routes";
import { AuthenticationContext } from "components/Session";
import SignOut from "components/SignOut";

const Navigation = () => (
  <AuthenticationContext.Consumer>
    {authenticatedUser =>
      authenticatedUser ? (
        <LinksWithAuthentication />
      ) : (
        <LinksWithoutAuthentication />
      )
    }
  </AuthenticationContext.Consumer>
);

const LinksWithAuthentication = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.SERVICES}>Services</Link>
    </li>
    <li>
      <Link to={ROUTES.PRODUCTS}>Products</Link>
    </li>
    <li>
      <SignOut />
    </li>
  </ul>
);

const LinksWithoutAuthentication = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

export default Navigation;
