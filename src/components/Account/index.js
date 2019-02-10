import React from "react";

import PasswordChange from "components/PasswordChange";
import PasswordForget from "components/PasswordForget";
import { withAuthorization } from "components/Session";

const Account = () => (
  <React.Fragment>
    <PasswordChange />
    <PasswordForget />
  </React.Fragment>
);

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(Account);
