import React from "react";

const FirebaseContext = React.createContext("firebase");

function withFirebase(Component) {
  return function WrappedWithFirebase(props) {
    return (
      <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  };
}

export { withFirebase };

export default FirebaseContext;
