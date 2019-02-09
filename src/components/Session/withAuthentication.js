import React from "react";

import AuthenticationContext from "./context";
import { withFirebase } from "components/Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authenticatedUser: null
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authenticatedUser =>
          authenticatedUser
            ? this.setState({ authenticatedUser })
            : this.setState({ authenticatedUser: null })
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthenticationContext.Provider value={this.state.authenticatedUser}>
          <Component {...this.props} />
        </AuthenticationContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
