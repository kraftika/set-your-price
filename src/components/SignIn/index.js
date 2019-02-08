import React, { Component } from "react";

import ROUTES from "constants/routes";
import { withFirebase } from "components/Firebase";

class SignInForm extends Component {
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
      <React.Fragment>
        <h1>Sign in - set price app</h1>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            placeholder="Email address"
            type="text"
            onChange={this.onChange}
          />
          <input
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={this.onChange}
          />
          <button type="submit" disable={isInvalid}>
            Sign In
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </React.Fragment>
    );
  }
}

export default withFirebase(SignInForm);
