import React, { Component } from 'react';
import ServiceListComponent from './ServiceListComponent';
import EditService from './EditService';

class ServiceComponent extends Component {
    state = {
        services: null,
        editMode: false,
        selectedService: null
    }

    componentDidMount() {
        this.setState({ services: [
            {
                id: 1,
                name: 'Transport',
                price: 11.94,
                ccy: 'EUR'
            },
            {
                id: 2,
                name: 'Broderie',
                price: 14.94,
                ccy: 'EUR'
            }
        ]});
    }

    saveService = () => {
        console.log('Save service');
    }    

    viewService = (selectedService) => {
        console.log('SelectedService', selectedService);
        this.setState({ editMode: true, selectedService });
    }

    render() {
        const { editMode, selectedService } = this.state;
        
        return (
            <div>
                {editMode && <EditService save={this.saveService} 
                            service={selectedService} />}
                {!editMode && <ServiceListComponent {...this.state} viewService={this.viewService} />}
            </div>
        );
    }
}

export default ServiceComponent;