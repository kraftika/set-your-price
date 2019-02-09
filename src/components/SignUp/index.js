import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "components/Firebase";
import ROUTES from "constants/routes";

class SignUpForm extends Component {
  initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: null
  };

  state = this.initialState;

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = async event => {
    const { username, email, password } = this.state;

    const promise = await this.props.firebase.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log("promise", promise);

    promise
      .then(authUser =>
        this.props.firebase.user(authUser.user.uid).set({ username, email })
      )
      .then(() => {
        this.setState({ ...this.initialState });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;
    const isInvalid =
      username === "" ||
      email === "" ||
      password === "" ||
      password !== confirmPassword;

    return (
      <React.Fragment>
        <h1>Sign Up - set price app</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Username
            <input
              name="username"
              value={username}
              type="text"
              placeholder="Username"
              onChange={this.onChange}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              value={email}
              type="text"
              placeholder="Email address"
              onChange={this.onChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              value={password}
              type="password"
              placeholder="Type your password"
              onChange={this.onChange}
            />
          </label>
          <label>
            Confirm Password
            <input
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
              onChange={this.onChange}
            />
          </label>
          <button type="submit" disabled={isInvalid}>
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </React.Fragment>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't you have an account? <Link to={ROUTES.SIGN_UP} />
  </p>
);

export default withFirebase(SignUpForm);

export { SignUpLink };
