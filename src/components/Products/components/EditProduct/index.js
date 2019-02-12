import React, { Component } from "react";

import ROUTES from "constants/routes";
import { withAuthorization } from "components/Session";

class ProductForm extends Component {
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
    const { uid: productUid, name, price, currentUser } = this.state;

    if (currentUser) {
      this.props.firebase
        .productRef(currentUser.uid, productUid)
        .set({ name, price })
        .then(() => {
          this.setState({ ...this.initialState });
          this.props.history.push(ROUTES.PRODUCTS);
        })
        .catch(error => this.setState({ error }));
    }

    event.preventDefault();
  };

  componentDidMount() {
    const {
      match: {
        params: { productId }
      }
    } = this.props;

    const currentUser = this.props.firebase.currentUser();

    this.setState({ uid: productId, currentUser });

    if (currentUser) {
      this.props.firebase
        .productRef(currentUser.uid, productId)
        .on("value", snapshot => {
          const { name, price } = snapshot.val();
          this.setState({ name, price });
        });
    }
  }

  componentWillUnmount() {
    this.props.firebase.productRef().off("value");
  }

  render() {
    const { name, price, error } = this.state;
    const isInvalid = name === "" || price === "" || isNaN(price);

    return (
      <React.Fragment>
        <h1>Product</h1>
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

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(ProductForm);
