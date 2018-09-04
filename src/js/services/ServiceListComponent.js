import React from 'react';

const ServiceListComponent = ({ services, viewService }) => (
    <div>
        <h1>Services</h1>
        {!services && <p>The service list is empty. Define service...</p>}
        <ul>
            {services && services.map(service => 
                <li key={service.name}>
                    {service.name} - {service.price}
                    <button onClick={() => viewService(service)}>View</button>
                </li>
            )}
        </ul>
    </div>
);

export default ServiceListComponent;