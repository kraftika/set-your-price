import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withAuthorization } from "components/Session";

class Products extends Component {
  state = { products: [], loading: false };
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
          this.setState({ products, loading: false });
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.firebase.products().off("value");
    this._isMounted = false;
  }

  render() {
    const { products, loading } = this.state;

    return (
      <div>
        <h1>Products</h1>
        <Link to={`/products/create`}>Create</Link>
        {products.length ? (
          <ProductItems products={products} onClick={this.onClick} />
        ) : (
          <div>No product saved</div>
        )}
        {loading && <p>Loading...</p>}
      </div>
    );
  }
}

const ProductItems = ({ products }) => (
  <ul>
    {products.map(product => (
      <li key={product.uid}>
        <span>{product.name} </span>
        <span>{product.price}</span>
        <Link to={`/products/${product.uid}`}>Edit</Link>
      </li>
    ))}
  </ul>
);

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(Products);
