import React, { Component } from "react";
import { Link } from "react-router-dom";

import ROUTES from "constants/routes";
import { withFirebase } from "components/Firebase";

class PasswordForget extends Component {
  initialState = { email: "", error: null };

  state = this.initialState;

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = event => {
    const { email } = this.state;

    this.props.withFirebase
      .resetPassword(email)
      .then(() => this.setState({ ...this.initialState }))
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const { email } = this.state;
    const isInvalid = email === "";

    return (
      <React.Fragment>
        <h1>Password forget - set price app</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Email
            <input
              name="email"
              value={email}
              placeholder="Email address"
              onChange={this.onChange}
            />
          </label>
          <button type="submit" disabled={isInvalid}>
            Reset my password
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
  </p>
);

export default withFirebase(PasswordForget);

export { PasswordForgetLink };
