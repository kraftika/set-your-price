import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withAuthorization } from "components/Session";
import ROUTES from "constants/routes";

class ServicesList extends Component {
  state = { currentUser: null, services: [], loading: false };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const currentUser = this.props.firebase.currentUser();

    if (currentUser) {
      this.setState({ loading: true });

      this.props.firebase.services(currentUser.uid).on("value", snapshot => {
        const userServices = snapshot.val() || {};

        const services = Object.keys(userServices).map(key => ({
          ...userServices[key],
          uid: key
        }));

        if (this._isMounted) {
          this.setState({ services, loading: false, currentUser });
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.firebase.services().off("value");
    this._isMounted = false;
  }

  deleteService = serviceId =>
    this.props.firebase
      .servicesRef(this.state.currentUser.uid, serviceId)
      .remove();

  render() {
    const { services, loading } = this.state;

    return (
      <React.Fragment>
        <h1>Services</h1>
        <Link to={ROUTES.CREATE_SERVICE}>Create</Link>
        {services.length ? (
          <ServiceItems
            services={services}
            onDeleteService={this.deleteService}
          />
        ) : (
          <div>No service saved</div>
        )}
        {loading && <p>Loading...</p>}
      </React.Fragment>
    );
  }
}

ServicesList.propTypes = {
  firebase: PropTypes.object.isRequired
};

const ServiceItems = ({ services, onDeleteService }) => (
  <ul>
    {services.map(service => (
      <li key={service.uid}>
        <span>{service.name} </span>
        <span>{service.price}</span>
        <Link to={`/services/${service.uid}/edit`}>Edit</Link>
        <button onClick={() => onDeleteService(service.uid)}>Delete</button>
      </li>
    ))}
  </ul>
);

ServiceItems.propTypes = {
  services: PropTypes.array.isRequired,
  onDeleteService: PropTypes.func.isRequired
};

const condition = authenticatedUser => !!authenticatedUser;

export default withAuthorization(condition)(ServicesList);
