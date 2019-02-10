import React from "react";

import { withAuthorization } from "components/Session";

const Home = () => <div>Home - What is your product price?</div>;

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(Home);
