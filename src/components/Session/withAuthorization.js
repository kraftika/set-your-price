import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import ROUTES from "constants/routes";
import { withFirebase } from "components/Firebase";
import { AuthenticationContext } from "components/Session";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authenticatedUser => {
          if (!condition(authenticatedUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthenticationContext.Consumer>
          {authenticatedUser =>
            condition(authenticatedUser) ? <Component {...this.props} /> : null
          }
        </AuthenticationContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
