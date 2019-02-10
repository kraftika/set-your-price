import React from "react";
import { withAuthorization } from "components/Session";

const Products = () => <div>Products page - What is your product price?</div>;

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(Products);
