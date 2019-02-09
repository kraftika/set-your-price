import React, { Component } from "react";

import { withFirebase } from "components/Firebase";

class PasswordChange extends Component {
  initialState = { password: "", confirmPassword: "", error: null };

  state = this.initialState;

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = event => {
    const { password } = this.state;

    this.props.firebase
      .updatePassword(password)
      .then(() => this.setState({ ...this.initialState }))
      .catch(error => this.setState({ error }));

    event.preventDefault();
  };

  render() {
    const { password, confirmPassword } = this.state;
    const isInvalid = password === "" || password !== confirmPassword;

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          New Password
          <input
            name="password"
            value={password}
            placeholder="New Password"
            type="password"
            onChange={this.onChange}
          />
        </label>
        <label>
          Confirm Password
          <input
            name="confirmPassword"
            value="confirmPassword"
            placeholder="Confirm password"
            onChange={this.onChange}
          />
        </label>
        <button type="submit" disabled={isInvalid}>
          Change
        </button>
      </form>
    );
  }
}

export default withFirebase(PasswordChange);
