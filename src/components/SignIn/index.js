import React, { Component } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import ROUTES from "constants/routes";
import { withFirebase } from "components/Firebase";
import { PasswordForgetLink } from "components/PasswordForget";

const SignIn = () => (
  <React.Fragment>
    <SignInForm />
    <PasswordForgetLink />
  </React.Fragment>
);
class SignInFormBase extends Component {
  initialState = { email: "", password: "", error: null };

  state = this.initialState;

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...this.initialState });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === "" || password === "";

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Email:
          <input
            name="email"
            value={email}
            placeholder="Email address"
            type="text"
            onChange={this.onChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={this.onChange}
          />
        </label>
        <button type="submit" disabled={isInvalid}>
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withFirebase,
  withRouter
)(SignInFormBase);

export default SignIn;
