import React, { Component } from "react";
import PropTypes from "prop-types";

import ROUTES from "constants/routes";
import { withAuthorization } from "components/Session";

class EditServiceForm extends Component {
  initialState = {
    uid: "",
    name: "",
    price: "",
    currentUser: null,
    error: null
  };

  state = this.initialState;

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = event => {
    const { uid: serviceUID, name, price, currentUser } = this.state;

    if (currentUser) {
      this.props.firebase
        .serviceRef(currentUser.uid, serviceUID)
        .set({ name, price })
        .then(() => {
          this.setState({ ...this.initialState });
          this.props.history.push(ROUTES.SERVICES);
        })
        .catch(error => this.setState({ error }));
    }

    event.preventDefault();
  };

  componentDidMount() {
    const {
      match: {
        params: { serviceId }
      }
    } = this.props;

    const currentUser = this.props.firebase.currentUser();

    this.setState({ uid: serviceId, currentUser });

    if (currentUser) {
      this.props.firebase
        .serviceRef(currentUser.uid, serviceId)
        .on("value", snapshot => {
          const { name, price } = snapshot.val();

          this.setState({ name, price });
        });
    }
  }

  componentWillUnmount() {
    this.props.firebase.serviceRef().off("value");
  }

  render() {
    const { name, price, error } = this.state;
    const isInvalid = name === "" || price === "" || isNaN(price);

    return (
      <React.Fragment>
        <h1>Service</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            name
            <input
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.onChange}
            />
          </label>
          <label>
            Price
            <input
              name="price"
              value={price}
              placeholder="Price"
              onChange={this.onChange}
            />
          </label>
          <button type="submit" disabled={isInvalid}>
            Save
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </React.Fragment>
    );
  }
}

EditServiceForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(EditServiceForm);
