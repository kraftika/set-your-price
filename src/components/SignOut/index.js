import React from "react";
import PropTypes from "prop-types";

import { withFirebase } from "components/Firebase";

const SignOut = ({ firebase }) => (
  <button type="button" onClick={firebase.signOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOut);

SignOut.propTypes = {
  firebase: PropTypes.object.isRequired
};
