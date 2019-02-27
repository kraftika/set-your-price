import React, { Component } from "react";
import PropTypes from "prop-types";

import ROUTES from "constants/routes";
import { withAuthorization } from "components/Session";

class CreateProductForm extends Component {
  initialState = {
    name: "",
    price: 0,
    error: null
  };

  state = this.initialState;

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onSubmit = event => {
    const { name, price } = this.state;

    const currentUser = this.props.firebase.currentUser();

    if (currentUser) {
      this.props.firebase
        .products(currentUser.uid)
        .push({ name, price })
        .then(() => {
          this.setState({ ...this.initialState });
          this.props.history.push(ROUTES.PRODUCTS);
        })
        .catch(error => {
          this.setState({ error });
        });
    }

    event.preventDefault();
  };

  render() {
    const { name, price, error } = this.state;
    const isInvalid = name === "" || price === "" || isNaN(price);

    return (
      <React.Fragment>
        <h1>Product</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Name
            <input
              name="name"
              value={name}
              placeholder="product name..."
              onChange={this.onChange}
            />
          </label>
          <label>
            Price
            <input
              type="number"
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

CreateProductForm.propTypes = {
  firebase: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(CreateProductForm);
