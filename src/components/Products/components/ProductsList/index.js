import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withAuthorization } from "components/Session";
import ROUTES from "constants/routes";

class Products extends Component {
  state = { currentUser: null, products: [], loading: false };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const currentUser = this.props.firebase.currentUser();

    if (currentUser) {
      this.setState({ loading: true });

      this.props.firebase.products(currentUser.uid).on("value", snapshot => {
        const userProducts = snapshot.val() || {};

        const products = Object.keys(userProducts).map(key => ({
          ...userProducts[key],
          uid: key
        }));

        if (this._isMounted) {
          this.setState({ products, loading: false, currentUser });
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.firebase.products().off("value");
    this._isMounted = false;
  }

  deleteProduct = productId =>
    this.props.firebase
      .productRef(this.state.currentUser.uid, productId)
      .remove();

  render() {
    const { products, loading } = this.state;

    return (
      <React.Fragment>
        <h1>Products</h1>
        <Link to={ROUTES.CREATE_PRODUCT}>Create</Link>
        {products.length ? (
          <ProductItems
            products={products}
            onDeleteProduct={this.deleteProduct}
          />
        ) : (
          <div>No product saved</div>
        )}
        {loading && <p>Loading...</p>}
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  firebase: PropTypes.object.isRequired
};

const ProductItems = ({ products, onDeleteProduct }) => (
  <ul>
    {products.map(product => (
      <li key={product.uid}>
        <span>{product.name} </span>
        <span>{product.price}</span>
        <Link to={`/products/${product.uid}/edit`}>Edit</Link>
        <button onClick={() => onDeleteProduct(product.uid)}>Delete</button>
      </li>
    ))}
  </ul>
);

ProductItems.propTypes = {
  products: PropTypes.array.isRequired,
  onDeleteProduct: PropTypes.func.isRequired
};

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(Products);
