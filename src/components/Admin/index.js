import React, { Component } from "react";

import { withFirebase } from "components/Firebase";

class Admin extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersDBValue = snapshot.val();

      const users = Object.keys(usersDBValue).map(key => ({
        ...usersDBValue[key],
        uid: key
      }));

      this.setState({ users, loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { loading, users } = this.state;

    return (
      <React.Fragment>
        <UsersList users={users} />
        {loading && <p>Loading...</p>}
      </React.Fragment>
    );
  }
}

const UsersList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong>
          {user.uid}
        </span>
        <span>
          <strong>Email</strong>
          {user.email}
        </span>
        <span>
          <strong>username</strong>
          {user.username}
        </span>
      </li>
    ))}
  </ul>
);
export default withFirebase(Admin);
