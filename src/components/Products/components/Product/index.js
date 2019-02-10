import React from "react";

import { withAuthorization } from "components/Session";

const Product = () => <div>Product page - What is your product price?</div>;

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(Product);
